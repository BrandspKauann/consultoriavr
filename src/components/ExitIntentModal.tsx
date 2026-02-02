import { useEffect, useState, useRef } from 'react';
import { LeadFormModal } from './LeadFormModal';

export const ExitIntentModal = () => {
  const [showModal, setShowModal] = useState(false);
  const hasShownRef = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Verificar se já mostrou hoje (comentado temporariamente para testar)
    const lastShown = localStorage.getItem('exit_intent_shown');
    const today = new Date().toDateString();
    
    // Descomente a linha abaixo para ativar a verificação diária
    // if (lastShown === today) {
    //   hasShownRef.current = true;
    //   return;
    // }

    const triggerModal = () => {
      if (!hasShownRef.current) {
        console.log('🚀 Exit Intent disparado!');
        hasShownRef.current = true;
        setShowModal(true);
        localStorage.setItem('exit_intent_shown', today);
      }
    };

    // Método principal: Detectar mouse saindo pelo topo
    const handleMouseLeave = (e: MouseEvent) => {
      console.log('Mouse leave - clientY:', e.clientY);
      // clientY <= 0 significa que o mouse saiu pela parte superior
      if (e.clientY <= 0 && !hasShownRef.current) {
        console.log('✅ Mouse saiu pelo topo - mostrando modal');
        triggerModal();
      }
    };

    // Método secundário: Detectar mouse próximo ao topo
    const handleMouseMove = (e: MouseEvent) => {
      // Limpar timeout anterior
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Se o mouse está nos primeiros 100 pixels do topo
      if (e.clientY <= 100 && e.clientY >= 0 && !hasShownRef.current) {
        console.log('Mouse próximo ao topo:', e.clientY);
        // Aguardar 200ms para confirmar
        timeoutRef.current = setTimeout(() => {
          if (!hasShownRef.current) {
            console.log('✅ Mouse confirmado no topo - mostrando modal');
            triggerModal();
          }
        }, 200);
      }
    };

    // Cancelar se mouse voltar
    const handleMouseEnter = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };

    // Adicionar listeners
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);

    console.log('✅ Exit Intent listeners adicionados');

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <LeadFormModal
      open={showModal}
      onOpenChange={setShowModal}
      title="Espere! Não vá embora ainda 🚀"
      description="Receba uma consultoria gratuita e descubra como economizar nos benefícios da sua empresa. Preencha o formulário e entraremos em contato!"
      origem="exit_intent"
    />
  );
};
