-- Coloca os 3 artigos de benefícios em DESTAQUE na home (BlogSection filtra featured = true).
-- Rode no SQL Editor se você já tinha importado o seed 011 com o 3º artigo sem destaque.
-- Ajuste site_id se seu VITE_SITE_ID não for 'default'.

UPDATE articles
SET
  featured = true,
  order_index = CASE slug
    WHEN 'vale-refeicao-ou-vale-alimentacao-guia-rh-2026' THEN 1
    WHEN 'reduzir-custos-beneficios-corporativos-percepcao-colaborador' THEN 2
    WHEN 'pat-beneficios-flexiveis-engajamento-compliance' THEN 3
    ELSE order_index
  END
WHERE site_id = 'default'
  AND slug IN (
    'vale-refeicao-ou-vale-alimentacao-guia-rh-2026',
    'reduzir-custos-beneficios-corporativos-percepcao-colaborador',
    'pat-beneficios-flexiveis-engajamento-compliance'
  );
