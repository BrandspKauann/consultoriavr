import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface LeadData {
  nome: string;
  email: string;
  telefone?: string;
  empresa?: string;
  cargo?: string;
  mensagem?: string;
  quantidadeCartoes?: string;
  principalDor?: string;
  origem?: string;
  metadata?: Record<string, any>;
}

const STORAGE_KEY = 'pending_leads';

// Detectar se está em produção
// Verifica múltiplas condições para garantir detecção correta
const isProduction = (): boolean => {
  // 1. Verifica se está em modo produção do Vite
  if (import.meta.env.PROD) return true;
  
  // 2. Verifica se não está em localhost
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    if (hostname !== 'localhost' && hostname !== '127.0.0.1' && !hostname.includes('192.168.')) {
      return true;
    }
  }
  
  // 3. Verifica variável de ambiente customizada (pode ser configurada no Vercel)
  if (import.meta.env.VITE_ENVIRONMENT === 'production') {
    return true;
  }
  
  return false;
};

// URL do webhook n8n — desenvolvimento: URL completa no .env; produção: proxy na Vercel (CORS)
// Preferência: VITE_N8N_WEBHOOK_URL → VITE_LEAD_WEBHOOK_URL
const getWebhookUrl = (): string => {
  const isProd = isProduction();

  if (isProd) {
    console.log("🌐 PRODUÇÃO — webhook via /api/webhook/lead (usa LEAD_WEBHOOK_URL ou N8N_WEBHOOK_URL na Vercel)");
    return "/api/webhook/lead";
  }

  const devUrl =
    import.meta.env.VITE_N8N_WEBHOOK_URL ||
    import.meta.env.VITE_LEAD_WEBHOOK_URL ||
    "http://host.docker.internal:5678/webhook/consultoria-vr";
  console.log("💻 DESENVOLVIMENTO — webhook direto:", devUrl);
  return devUrl;
};

// Chamar webhook do n8n
const callLeadWebhook = async (leadData: LeadData) => {
  try {
    const webhookUrl = getWebhookUrl();
    
    if (!webhookUrl) {
      console.warn('⚠️ URL do webhook não configurada');
      return;
    }

    const payload = {
      nome: leadData.nome,
      email: leadData.email,
      telefone: leadData.telefone,
      empresa: leadData.empresa,
      cargo: leadData.cargo,
      mensagem: leadData.mensagem,
      quantidadeCartoes: leadData.quantidadeCartoes,
      principalDor: leadData.principalDor,
      origem: leadData.origem || "formulario_site",
      metadata: leadData.metadata ?? {},
      timestamp: new Date().toISOString(),
      url: typeof window !== "undefined" ? window.location.href : "",
      userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "",
    };

    const environment = isProduction() ? 'PRODUÇÃO' : 'DESENVOLVIMENTO';
    console.log(`🚀 [${environment}] Chamando webhook n8n:`, webhookUrl);
    console.log('📦 Payload:', payload);

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    console.log('📡 Resposta do webhook:', {
      status: response.status,
      statusText: response.statusText,
      ok: response.ok
    });

    if (!response.ok) {
      let errorText = 'Sem resposta';
      try {
        const errorData = await response.json();
        errorText = errorData.message || errorData.error || JSON.stringify(errorData);
      } catch {
        errorText = await response.text().catch(() => 'Sem resposta');
      }
      
      // Verificar se o erro é de webhook não registrado
      if (response.status === 404 || errorText.includes('not registered') || errorText.includes('not found')) {
        console.warn('⚠️ Webhook não encontrado no n8n. Certifique-se de que:');
        console.warn('   1. O workflow está criado no n8n');
        console.warn(
          "   2. Webhook no n8n (oficial: http://host.docker.internal:5678/webhook/consultoria-vr) ativo"
        );
        console.warn('   3. O workflow está ATIVO (toggle no canto superior direito)');
        if (isProduction()) {
          console.warn("   4. Configure LEAD_WEBHOOK_URL ou N8N_WEBHOOK_URL na Vercel (URL do webhook n8n)");
        } else {
          console.warn(`   4. Confira VITE_N8N_WEBHOOK_URL / VITE_LEAD_WEBHOOK_URL: ${webhookUrl}`);
        }
      }
      
      throw new Error(`Webhook retornou status ${response.status}: ${errorText}`);
    }

    const responseData = await response.json().catch(() => null);
    console.log(`✅ [${environment}] Webhook n8n chamado com sucesso!`, responseData);
  } catch (error: any) {
    console.error('❌ Erro ao chamar webhook n8n:', error);
    console.error('Detalhes:', {
      message: error.message,
      stack: error.stack,
      environment: isProduction() ? 'PRODUÇÃO' : 'DESENVOLVIMENTO',
      hostname: typeof window !== 'undefined' ? window.location.hostname : 'N/A',
      viteProd: import.meta.env.PROD,
      viteMode: import.meta.env.MODE
    });
    // Não bloqueia o salvamento do lead se o webhook falhar
  }
};

// Salvar lead no localStorage como fallback
const saveToLocalStorage = (lead: LeadData) => {
  try {
    const pending = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    pending.push({
      ...lead,
      timestamp: new Date().toISOString(),
      synced: false
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(pending));
    return true;
  } catch (error) {
    console.error('Erro ao salvar no localStorage:', error);
    return false;
  }
};

// Tentar sincronizar leads pendentes do localStorage
export const syncPendingLeads = async () => {
  try {
    const pending = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    const unsynced = pending.filter((lead: any) => !lead.synced);
    
    if (unsynced.length === 0) return;

    for (const lead of unsynced) {
      try {
        const { error } = await supabase
          .from('leads')
        .insert([{
          nome: lead.nome,
          email: lead.email,
          telefone: lead.telefone,
          empresa: lead.empresa,
          cargo: lead.cargo,
          mensagem: lead.mensagem,
          origem: lead.origem || 'formulario_site',
          metadata: {
            ...lead.metadata,
            quantidadeCartoes: lead.quantidadeCartoes,
            principalDor: lead.principalDor
          }
        }]);

        if (!error) {
          lead.synced = true;
        }
      } catch (error) {
        console.error('Erro ao sincronizar lead:', error);
      }
    }

    // Atualizar localStorage removendo leads sincronizados
    const stillPending = pending.filter((lead: any) => !lead.synced);
    if (stillPending.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stillPending));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  } catch (error) {
    console.error('Erro ao sincronizar leads pendentes:', error);
  }
};

export const useCreateLead = () => {
  const [isLoading, setIsLoading] = useState(false);

  const createLead = async (leadData: LeadData) => {
    setIsLoading(true);
    let savedToDatabase = false;
    let savedToLocalStorage = false;

    // Webhook n8n em paralelo ao Supabase — o fluxo do n8n recebe mesmo se o banco falhar
    const webhookPromise = callLeadWebhook(leadData);

    try {
      const { data, error } = await supabase
        .from("leads")
        .insert([
          {
            nome: leadData.nome,
            email: leadData.email,
            telefone: leadData.telefone,
            empresa: leadData.empresa,
            cargo: leadData.cargo,
            mensagem: leadData.mensagem,
            origem: leadData.origem || "formulario_site",
            metadata: {
              ...leadData.metadata,
              quantidadeCartoes: leadData.quantidadeCartoes,
              principalDor: leadData.principalDor,
              userAgent: navigator.userAgent,
              timestamp: new Date().toISOString(),
              url: window.location.href,
            },
          },
        ])
        .select()
        .single();

      if (error) throw error;

      savedToDatabase = true;
      console.log("✅ Lead salvo no banco:", data);
    } catch (error: unknown) {
      console.error("❌ Erro ao salvar no Supabase:", error);

      savedToLocalStorage = saveToLocalStorage(leadData);
      if (savedToLocalStorage) {
        console.log("💾 Lead salvo no localStorage como fallback");
        setTimeout(() => syncPendingLeads(), 2000);
      }
    }

    await webhookPromise;

    setIsLoading(false);

    // Retornar status para feedback ao usuário
    return {
      success: savedToDatabase || savedToLocalStorage,
      savedToDatabase,
      savedToLocalStorage
    };
  };

  return { createLead, isLoading };
};
