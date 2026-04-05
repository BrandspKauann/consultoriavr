import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { FORMSPREE_SUBMIT_URL } from "@/config/formspree";

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
  metadata?: Record<string, unknown>;
}

const STORAGE_KEY = "pending_leads";

/** Envia cópia do lead para o Formspree (e-mail / painel). */
async function submitToFormspree(leadData: LeadData): Promise<boolean> {
  try {
    const payload: Record<string, unknown> = {
      nome: leadData.nome,
      email: leadData.email,
      telefone: leadData.telefone ?? "",
      empresa: leadData.empresa ?? "",
      cargo: leadData.cargo ?? "",
      mensagem: leadData.mensagem ?? "",
      quantidadeCartoes: leadData.quantidadeCartoes ?? "",
      principalDor: leadData.principalDor ?? "",
      origem: leadData.origem || "formulario_site",
      _subject: `Contato site — ${leadData.nome}`,
      _replyto: leadData.email,
      timestamp: new Date().toISOString(),
      url: typeof window !== "undefined" ? window.location.href : "",
      userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "",
    };
    if (leadData.metadata && Object.keys(leadData.metadata).length > 0) {
      payload.metadata_json = JSON.stringify(leadData.metadata);
    }

    const response = await fetch(FORMSPREE_SUBMIT_URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = (await response.json().catch(() => null)) as { ok?: boolean } | null;
    if (!response.ok) {
      console.warn("Formspree:", response.status, data);
      return false;
    }
    return data?.ok !== false;
  } catch (e) {
    console.error("Erro ao enviar para Formspree:", e);
    return false;
  }
}

const saveToLocalStorage = (lead: LeadData) => {
  try {
    const pending = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    pending.push({
      ...lead,
      timestamp: new Date().toISOString(),
      synced: false,
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(pending));
    return true;
  } catch (error) {
    console.error("Erro ao salvar no localStorage:", error);
    return false;
  }
};

export const syncPendingLeads = async () => {
  try {
    const pending = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    const unsynced = pending.filter((lead: { synced?: boolean }) => !lead.synced);

    if (unsynced.length === 0) return;

    for (const lead of unsynced) {
      try {
        const { error } = await supabase.from("leads").insert([
          {
            nome: lead.nome,
            email: lead.email,
            telefone: lead.telefone,
            empresa: lead.empresa,
            cargo: lead.cargo,
            mensagem: lead.mensagem,
            origem: lead.origem || "formulario_site",
            metadata: {
              ...lead.metadata,
              quantidadeCartoes: lead.quantidadeCartoes,
              principalDor: lead.principalDor,
            },
          },
        ]);

        if (!error) {
          lead.synced = true;
        }
      } catch (error) {
        console.error("Erro ao sincronizar lead:", error);
      }
    }

    const stillPending = pending.filter((lead: { synced?: boolean }) => !lead.synced);
    if (stillPending.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stillPending));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  } catch (error) {
    console.error("Erro ao sincronizar leads pendentes:", error);
  }
};

export const useCreateLead = () => {
  const [isLoading, setIsLoading] = useState(false);

  const createLead = async (leadData: LeadData) => {
    setIsLoading(true);
    let savedToDatabase = false;
    let savedToLocalStorage = false;

    const formspreePromise = submitToFormspree(leadData);

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
      console.log("Lead salvo no banco:", data);
    } catch (error: unknown) {
      console.error("Erro ao salvar no Supabase:", error);

      savedToLocalStorage = saveToLocalStorage(leadData);
      if (savedToLocalStorage) {
        console.log("Lead salvo no localStorage como fallback");
        setTimeout(() => syncPendingLeads(), 2000);
      }
    }

    const savedToFormspree = await formspreePromise;

    setIsLoading(false);

    return {
      success: savedToDatabase || savedToLocalStorage || savedToFormspree,
      savedToDatabase,
      savedToLocalStorage,
      savedToFormspree,
    };
  };

  return { createLead, isLoading };
};
