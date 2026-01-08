import React from 'react';
import { MessageSquare } from 'lucide-react';

export function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/5521933009048"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform active:scale-95 flex items-center justify-center"
      aria-label="Falar no WhatsApp"
    >
      <MessageSquare className="h-6 w-6 fill-current" />
      <span className="sr-only">WhatsApp</span>
    </a>
  );
}
