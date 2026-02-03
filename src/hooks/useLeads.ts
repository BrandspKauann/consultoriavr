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
// URL do webhook - pode ser configurada via .env ou usar a padrão da VPS
// O n8n está rodando em Docker na VPS, então usamos o IP da VPS
// Para mudar, configure no .env: VITE_LEAD_WEBHOOK_URL=http://seu-ip-ou-dominio:5678/webhook/webhookn8n
const WEBHOOK_URL = import.meta.env.VITE_LEAD_WEBHOOK_URL || 'http://77.37.43.210:5678/webhook/webhookn8n';

// Chamar webhook do n8n
const callLeadWebhook = async (leadData: LeadData) => {
  try {
    const webhookUrl = WEBHOOK_URL || import.meta.env.VITE_LEAD_WEBHOOK_URL;
    
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
      origem: leadData.origem || 'formulario_site',
      timestamp: new Date().toISOString(),
      url: window.location.href,
      userAgent: navigator.userAgent,
    };

    console.log('🚀 Chamando webhook n8n:', webhookUrl);
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
      const errorText = await response.text().catch(() => 'Sem resposta');
      throw new Error(`Webhook retornou status ${response.status}: ${errorText}`);
    }

    const responseData = await response.json().catch(() => null);
    console.log('✅ Webhook n8n chamado com sucesso!', responseData);
  } catch (error: any) {
    console.error('❌ Erro ao chamar webhook n8n:', error);
    console.error('Detalhes:', {
      message: error.message,
      stack: error.stack
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

    try {
      // Tentativa 1: Salvar no Supabase
      const { data, error } = await supabase
        .from('leads')
        .insert([{
          nome: leadData.nome,
          email: leadData.email,
          telefone: leadData.telefone,
          empresa: leadData.empresa,
          cargo: leadData.cargo,
          mensagem: leadData.mensagem,
          origem: leadData.origem || 'formulario_site',
          metadata: {
            ...leadData.metadata,
            quantidadeCartoes: leadData.quantidadeCartoes,
            principalDor: leadData.principalDor,
            userAgent: navigator.userAgent,
            timestamp: new Date().toISOString(),
            url: window.location.href
          }
        }])
        .select()
        .single();

      if (error) throw error;
      
      savedToDatabase = true;
      console.log('✅ Lead salvo no banco:', data);

      // Chamar webhook do n8n após salvar com sucesso
      await callLeadWebhook(leadData);

    } catch (error: any) {
      console.error('❌ Erro ao salvar no Supabase:', error);
      
      // Tentativa 2: Salvar no localStorage como fallback
      savedToLocalStorage = saveToLocalStorage(leadData);
      
      if (savedToLocalStorage) {
        console.log('💾 Lead salvo no localStorage como fallback');
        // Chamar webhook mesmo se salvou no localStorage
        await callLeadWebhook(leadData);
        // Tentar sincronizar em background
        setTimeout(() => syncPendingLeads(), 2000);
      }
    }

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
