import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  Star,
  ShieldCheck,
  ShoppingBag,
  Box,
  Sparkles,
  Flame,
  Trophy,
  Zap,
  Clock,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const carouselItems = [
  { title: "Animes", desc: "Modelos ultra detalhados de personagens de anime, mangá e séries clássicas com alta procura no mercado.", img: "https://i.ibb.co/bgYTJwPK/Chat-GPT-Image-24-de-jun-de-2026-10-53-22.png", badge: "ALTA DEMANDA" },
  { title: "Desenhos", desc: "Nostalgia garantida com personagens amados da TV, desenhos clássicos e animações de grande sucesso.", img: "https://i.ibb.co/ZRF0hxJ8/Screenshot-3.png", badge: "NOVIDADE" },
  { title: "Religião", desc: "Modelos sagrados, santos detalhados, crucifixos, oratórios e peças de altíssima representação e respeito.", img: "https://i.ibb.co/svxNKQmX/Screenshot-5.png", badge: "EXCLUSIVO" },
  { title: "Mitologia", desc: "Esculturas incríveis de heróis lendários, deuses mitológicos antigos e criaturas épicas fantásticas.", img: "https://i.ibb.co/9H2HNW3j/Screenshot-6.png", badge: "PRODUTO PREMIUM" },
  { title: "Decoração", desc: "Vasos geométricos, organizadores criativos, luminárias modernas e peças autorais de design de interiores.", img: "https://i.ibb.co/7d2rprNs/Screenshot-4.png", badge: "MAIS VENDIDO" },
  { title: "E muito mais...", desc: "Milhares de outros modelos STL profissionais de diversos nichos esperando para serem impressos por você.", img: "https://i.ibb.co/TMqK5R5y/Screenshot-7.png", badge: "ILIMITADO" }
];

const buyerNames = ["Adriano P.", "Mariana S.", "João D.", "Renato M.", "Carlos Maker", "Felipe 3D", "Lucas G.", "Patrícia R.", "Roberto Studio", "Gustavo K."];
const buyerCities = ["São Paulo", "Rio de Janeiro", "Belo Horizonte", "Curitiba", "Porto Alegre", "Salvador", "Fortaleza", "Brasília", "Manaus", "Recife"];

function AnimatedSection({ children, className, id }: { children: React.ReactNode; className?: string; id?: string }) {
  return (
    <section id={id} className={className}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.55, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </section>
  );
}

export default function LandingPage() {
  const [purchaseNotification, setPurchaseNotification] = useState<{ name: string; city: string } | null>(null);
  const [showUpsell, setShowUpsell] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    let hideTimeout: ReturnType<typeof setTimeout>;
    const showNotification = () => {
      const name = buyerNames[Math.floor(Math.random() * buyerNames.length)];
      const city = buyerCities[Math.floor(Math.random() * buyerCities.length)];
      setPurchaseNotification({ name, city });
      hideTimeout = setTimeout(() => setPurchaseNotification(null), 5000);
    };
    const initial = setTimeout(showNotification, 4000);
    const interval = setInterval(showNotification, 15000);
    return () => { clearTimeout(initial); clearTimeout(hideTimeout); clearInterval(interval); };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setCurrentSlide(p => (p + 1) % carouselItems.length), 4000);
    return () => clearInterval(interval);
  }, []);

  const scrollToPricing = () => document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" });

  const handlePurchase = (productName: string) => {
    if (productName === "PACOTE BÁSICO") setShowUpsell(true);
    else if (productName === "PACOTE PREMIUM") window.location.href = "https://pay.wiapy.com/-VyI-5ZjuiG";
    else if (productName === "Oferta Especial Upgrade") window.location.href = "https://pay.wiapy.com/dIV7VuWCBFI";
    else window.location.href = "https://checkout.educafacl.shop/VCCL1O8SCNEQ";
  };

  const confirmBasicOnly = () => { setShowUpsell(false); window.location.href = "https://pay.wiapy.com/Ryh3dZFhPo5"; };
  const prevSlide = () => setCurrentSlide(p => (p === 0 ? carouselItems.length - 1 : p - 1));
  const nextSlide = () => setCurrentSlide(p => (p + 1) % carouselItems.length);

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-50 overflow-x-hidden">

      {/* STICKY HEADER */}
      <div className="sticky top-0 z-50 bg-orange-600 text-slate-950 py-2.5 px-3 text-center font-black text-xs sm:text-sm uppercase flex items-center justify-center gap-2 shadow-md tracking-wider">
        <span className="animate-bounce inline-block">⚽</span>
        <span>TEMPORADA DA COPA! Aproveite os descontos especiais deste mês.</span>
        <span className="animate-bounce inline-block">⚽</span>
      </div>

      {/* ── HERO ── */}
      <section className="pt-10 pb-16 px-4 sm:px-6 bg-slate-950 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-cyan-500/5 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-orange-500/5 blur-[100px] pointer-events-none" />
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-10 lg:gap-16 relative">

          {/* Left */}
          <div className="flex-1 text-center lg:text-left space-y-6">
            <div className="flex items-center justify-center lg:justify-start gap-1">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-yellow-400 text-yellow-400" />)}
              <span className="ml-2 font-bold text-yellow-400 text-xs sm:text-sm tracking-wider">4,98 (5286 AVALIAÇÕES)</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase leading-tight tracking-tight">
              TRANSFORME SUA IMPRESSORA 3D EM UMA{" "}
              <span className="text-orange-500">MÁQUINA DE LUCRO</span>{" "}
              COM MAIS DE 90 MIL PROJETOS!
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl mx-auto lg:mx-0">
              Com esse PACK você tem acesso imediato a milhares de modelos prontos para lucrar! Não precisa criar nada do zero, basta baixar e imprimir.
            </p>

            <ul className="space-y-3 text-left max-w-md mx-auto lg:mx-0">
              {["Arquivos testados, otimizados e organizados por nichos.", "Modelos que já vendem na Shopee e OLX.", "Acesso imediato."].map((text, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="mt-1 shrink-0 w-5 h-5 rounded-full bg-orange-500/20 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-orange-500" />
                  </div>
                  <span className="text-sm sm:text-base font-semibold">{text}</span>
                </li>
              ))}
            </ul>

            <div className="pt-2 flex flex-col items-center lg:items-start gap-3">
              <div className="flex items-center gap-2 text-orange-500 font-black uppercase tracking-widest text-xs sm:text-sm animate-pulse">
                <span className="lg:hidden">👇</span>
                <span className="hidden lg:inline">👉</span>
                <span>ASSISTA AO VÍDEO DE APRESENTAÇÃO</span>
                <span className="hidden lg:inline">👈</span>
              </div>
              <div className="flex flex-wrap justify-center lg:justify-start gap-x-4 gap-y-1 text-xs sm:text-sm font-semibold text-slate-400">
                <span>+90.000 arquivos STL</span>
                <span>•</span>
                <span>4.98/5 avaliações</span>
                <span>•</span>
                <span>Acesso imediato</span>
              </div>
            </div>
          </div>

          {/* Right – video */}
          <div className="w-full max-w-xs sm:max-w-sm lg:w-[340px] shrink-0 relative">
            <div className="absolute -inset-3 bg-orange-500/20 blur-2xl rounded-[3rem] -z-10" />
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 shadow-2xl">
              <div className="aspect-[9/16] relative rounded-xl overflow-hidden bg-slate-950">
                <iframe
                  src="https://player.vimeo.com/video/1204401314"
                  className="absolute inset-0 w-full h-full"
                  frameBorder="0"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  title="Apresentação Mega Pack STL"
                />
              </div>
              <button
                onClick={scrollToPricing}
                className="w-full mt-3 py-3.5 text-base font-black uppercase bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-slate-950 rounded-xl shadow-lg shadow-orange-500/20 transition-all active:scale-95"
              >
                🚀 VER OFERTAS AGORA
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* ── PAIN AGITATION ── */}
      <AnimatedSection className="py-16 sm:py-20 px-4 sm:px-6 bg-white text-slate-950">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-block bg-red-100 text-red-600 font-bold px-4 py-1.5 rounded-full text-xs uppercase tracking-widest mb-5">
            FACILITE SEU PROCESSO
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase mb-12 leading-tight">
            ESTE PACK FOI FEITO PARA FACILITAR A SUA VIDA...
          </h2>

          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 mb-12">
            {[
              "Chega de perder horas procurando modelos 3D e acabar com arquivos ruins.",
              "Pare de gastar caro comprando modelos individuais que nem sempre valem o investimento.",
              "Diga adeus à frustração de ter sua impressora parada por falta de variedade.",
              "Comece a lucrar de verdade com milhares de modelos prontos para imprimir e vender."
            ].map((text, i) => (
              <div key={i} className="bg-slate-50 p-5 sm:p-6 rounded-2xl border border-slate-200 text-left flex items-start gap-4">
                <Flame className="w-6 h-6 text-red-500 shrink-0 mt-0.5" />
                <p className="text-sm sm:text-base font-bold leading-snug">{text}</p>
              </div>
            ))}
          </div>

          <div className="border-2 border-orange-500 bg-orange-50 p-6 sm:p-10 rounded-2xl max-w-3xl mx-auto relative">
            <span className="text-5xl text-orange-200 absolute top-3 left-4 font-serif leading-none select-none">"</span>
            <p className="text-base sm:text-xl font-bold italic relative z-10">
              Ter o arquivo certo na hora certa muda tudo. Não desperdice filamento com modelos ruins ou mal planejados.
            </p>
          </div>
        </div>
      </AnimatedSection>

      {/* ── BENEFITS + CAROUSEL ── */}
      <AnimatedSection className="py-16 sm:py-20 px-4 sm:px-6 bg-slate-950">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block bg-orange-500/10 text-orange-400 font-bold px-4 py-1.5 rounded-full text-xs uppercase tracking-widest mb-4 border border-orange-500/20">
              BENEFÍCIOS REAIS
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase">
              COM NOSSO MATERIAL VOCÊ TERÁ:
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 mb-16">
            {[
              { icon: Box, title: "IDEIAS INFINITAS PARA VENDER", desc: "Tenha acesso a uma biblioteca com milhares de temas e categorias." },
              { icon: Clock, title: "MAIS TEMPO LIVRE", desc: "Tudo organizado e separado por pastas, pronto para imprimir." },
              { icon: Trophy, title: "LUCROS PREVISÍVEIS", desc: "Modelos testados e aprovados que vendem com frequência e garantem retorno constante." },
              { icon: Zap, title: "ACESSO RÁPIDO E SEGURO", desc: "Baixe tudo de forma simples e use no computador, celular ou HD externo." }
            ].map((item, i) => (
              <div key={i} className="bg-slate-900 rounded-2xl p-5 sm:p-6 flex items-start gap-4 border-l-4 border-l-orange-500 border border-slate-800">
                <div className="p-2.5 bg-orange-500/10 rounded-xl shrink-0">
                  <item.icon className="w-6 h-6 text-orange-500" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-black uppercase mb-1.5">{item.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Carousel heading */}
          <div className="text-center mb-8">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-black uppercase">
              VEJA OS MODELOS QUE <span className="text-orange-500">VOCÊ IRÁ RECEBER:</span>
            </h3>
          </div>

          {/* Carousel – 1 card mobile, 3 cards desktop using index offsets */}
          <div className="relative px-8 sm:px-10">
            <button onClick={prevSlide} aria-label="Anterior" className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-9 h-9 sm:w-11 sm:h-11 flex items-center justify-center bg-slate-900 border border-slate-700 rounded-full hover:bg-orange-500 hover:border-orange-500 transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button onClick={nextSlide} aria-label="Próximo" className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-9 h-9 sm:w-11 sm:h-11 flex items-center justify-center bg-slate-900 border border-slate-700 rounded-full hover:bg-orange-500 hover:border-orange-500 transition-colors">
              <ChevronRight className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {[0, 1, 2].map((offset) => {
                const idx = (currentSlide + offset) % carouselItems.length;
                const item = carouselItems[idx];
                return (
                  <div
                    key={`${offset}-${idx}`}
                    className={cn(
                      "bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 shadow-xl group transition-all duration-300 hover:border-orange-500/50",
                      offset === 1 ? "hidden md:block" : "",
                      offset === 2 ? "hidden lg:block" : ""
                    )}
                  >
                    <div className="aspect-[4/3] relative overflow-hidden bg-slate-950">
                      <div className="absolute top-3 left-3 z-10 bg-orange-500 text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider">
                        {item.badge}
                      </div>
                      <img
                        src={item.img}
                        alt={item.title}
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4 sm:p-5">
                      <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-3">{item.desc}</p>
                    </div>
                    <div className="bg-slate-100 text-slate-950 py-3 px-5 font-black text-center text-sm sm:text-base uppercase tracking-wide">
                      {item.title}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-center gap-2 mt-6">
              {carouselItems.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className={cn("h-2.5 rounded-full transition-all duration-300", currentSlide === i ? "w-7 bg-orange-500" : "w-2.5 bg-slate-700 hover:bg-slate-600")}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* ── COMPARISON ── */}
      <AnimatedSection className="py-16 sm:py-20 px-4 sm:px-6 bg-white text-slate-950">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block bg-rose-100 text-rose-600 font-bold px-4 py-1.5 rounded-full text-xs uppercase tracking-widest mb-4">
              COMPARAÇÃO REAL
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase">
              POR QUE SOMOS A MELHOR OPÇÃO?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8">
              <h3 className="text-base sm:text-lg font-black mb-6 text-slate-500 flex items-center gap-2">
                <span>❌</span> SEM O NOSSO MEGA PACK STL
              </h3>
              <ul className="space-y-4">
                {[
                  "Perde tempo caçando arquivos em sites e grupos",
                  "Encontra modelos quebrados, incompletos ou incompatíveis",
                  "Precisa pagar caro por cada modelo individual",
                  "Fica limitado a poucos projetos e ideias",
                  "Corre risco com arquivos maliciosos"
                ].map((text, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base text-slate-600 font-medium">{text}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-slate-950 border-2 border-orange-500 rounded-2xl p-6 sm:p-8 shadow-xl shadow-orange-500/10 text-white relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-orange-500 text-white text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg whitespace-nowrap">
                Sua Melhor Escolha
              </div>
              <h3 className="text-base sm:text-lg font-black mb-6 text-orange-400 flex items-center gap-2 pt-2">
                <span>✅</span> COM O NOSSO MEGA PACK STL
              </h3>
              <ul className="space-y-4">
                {[
                  "Acesso instantâneo a mais de 90 mil modelos organizados",
                  "Arquivos testados, compatíveis e prontos para uso",
                  "Economia total, sem mensalidade nem taxas extras",
                  "Material exclusivo com temas variados",
                  "Suporte completo e acesso vitalício"
                ].map((text, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base font-semibold">{text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* ── FACILIDADES ── */}
      <AnimatedSection className="py-16 sm:py-20 px-4 sm:px-6 bg-zinc-900">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block bg-orange-500/10 text-orange-400 font-bold px-4 py-1.5 rounded-full text-xs uppercase tracking-widest mb-4 border border-orange-500/20">
              FACILIDADE TOTAL
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase">
              FACILIDADES QUE SÓ ESSE PACK OFERECE!
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
            {[
              { icon: Clock, title: "MAIS TEMPO PARA LUCRAR", desc: "Pare de perder horas procurando arquivos e use esse tempo para imprimir e vender mais.", gradient: "from-orange-500 to-amber-500" },
              { icon: ShoppingBag, title: "UM NEGÓCIO PRONTO", desc: "Com milhares de modelos disponíveis, você começa a lucrar rapidamente, mesmo com pouca experiência.", gradient: "from-cyan-500 to-blue-500" },
              { icon: Sparkles, title: "LIBERDADE PARA PRODUZIR", desc: "Imprima o que quiser, quando quiser, e tenha liberdade total pra gerenciar suas vendas.", gradient: "from-emerald-500 to-teal-500" },
              { icon: Zap, title: "VENDAS CONSISTENTES", desc: "Use modelos com alta demanda e conquiste um fluxo constante de pedidos e faturamento.", gradient: "from-yellow-400 to-orange-500" }
            ].map((item, i) => (
              <div key={i} className="bg-zinc-950 p-5 sm:p-7 rounded-2xl relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300">
                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${item.gradient}`} />
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-gradient-to-br ${item.gradient}`}>
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-sm sm:text-base font-black mb-3 uppercase">{item.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* ── BONUS MODULES ── */}
      <AnimatedSection className="py-16 sm:py-20 px-4 sm:px-6 bg-white text-slate-950">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-block bg-orange-100 text-orange-600 font-bold px-4 py-1.5 rounded-full text-xs uppercase tracking-widest mb-4">
              SUPER COMBINAÇÃO
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black uppercase mb-4 leading-tight">
              COMPRE HOJE O PACOTE PREMIUM E GANHE{" "}
              <span className="text-orange-500">11 MÓDULOS EXCLUSIVOS</span> 🎁
            </h2>
            <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
              Garantindo seu acesso à oferta Premium hoje, você recebe gratuitamente este arsenal de pacotes especiais avaliados em mais de R$ 300,00!
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mb-10">
            {[
              { title: "Pack de Veículos 3D Profissionais", img: "https://i.ibb.co/Xxj3m9Vc/Screenshot-8.png", old: "19,90", desc: "Carros, motos, caminhões e muito mais prontos para impressão 3D. Crie miniaturas detalhadas, peças colecionáveis ou personalize modelos para revenda." },
              { title: "Coleção Heróis da Marvel", img: "https://i.ibb.co/Q73zc7h1/Screenshot-9.png", old: "29,90", desc: "Receba uma coleção incrível de modelos STL de heróis lendários da Marvel: personagens, símbolos e acessórios que fazem sucesso entre colecionadores e fãs." },
              { title: "Pack de Chaveiros Personalizados", img: "https://i.ibb.co/p6KQKrwg/Screenshot-10.png", old: "14,90", desc: "Mais de 1.000 modelos criativos e exclusivos, incluindo logos, personagens, esportes e temas geek. Perfeito para vender como brindes ou acessórios colecionáveis." },
              { title: "Utensílios Domésticos Práticos", img: "https://i.ibb.co/bgDyCNHP/Screenshot-11.png", old: "24,90", desc: "Inclui modelos práticos para uso doméstico e profissional: suportes, organizadores, gabaritos e adaptadores altamente úteis para o dia a dia." },
              { title: "Modelos Flexíveis e Articulados", img: "https://i.ibb.co/mFMD6z3s/Screenshot-12.png", old: "34,90", desc: "Mais de 1.300 modelos com mecanismos de clique e movimento, como animais, dragões, dinossauros e brinquedos colecionáveis interativos de alta diversão." },
              { title: "Coleção Clássicos dos Desenhos", img: "https://i.ibb.co/YFg7cGy5/Screenshot-13.png", old: "39,90", desc: "Uma seleção nostálgica com mais de 30 personagens amados da TV: Johnny Bravo, As Meninas Superpoderosas, Dexter, Scooby-Doo, Tom & Jerry e muitos outros clássicos." },
              { title: "Coleção Máscaras 3D", img: "https://i.ibb.co/fwT910j/Screenshot-14.png", old: "44,90", desc: "Dezenas de masks detalhadas em tamanho real e prontas para imprimir. Ideais para cosplay, decoração temática, festas e peças de altíssimo valor de mercado." },
              { title: "Coleção Pokémon 3D", img: "https://i.ibb.co/KjdZPCWX/Screenshot-15.png", old: "29,90", desc: "Mais de 100 modelos das primeiras gerações de Pokémon. Criaturas icônicas, evoluções fantásticas, insígnias de ginásios e itens temáticos decorativos." },
              { title: "Pack de Mascotes Premium", img: "https://i.ibb.co/rfRZHZ6X/Screenshot-17.png", old: "24,90", desc: "Coleção completa de mascotes 3D fofos prontos para imprimir. Personagens carismáticos ideais para brindes infantis, decoração rápida e revenda de lembranças." },
              { title: "Modelos Efeito Bordados", img: "https://i.ibb.co/Kpt4fMRW/Screenshot-18.png", old: "14,90", desc: "Dezenas de modelos com efeito texturizado de bordado para impressão 3D. Placas, quadros e peças decorativas artísticas com acabamento único." },
            ].map((bonus, i) => (
              <div key={i} className="bg-white border-2 border-slate-200 rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:border-orange-400 transition-all duration-300 flex flex-col group">
                <div className="bg-gradient-to-r from-orange-500 to-amber-500 py-2.5 px-4 text-center">
                  <span className="text-white font-black uppercase tracking-wider text-xs">MÓDULO EXCLUSIVO</span>
                </div>
                <div className="aspect-[4/3] relative overflow-hidden bg-slate-100">
                  <img src={bonus.img} alt={bonus.title} loading="lazy" referrerPolicy="no-referrer" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-4 sm:p-5 flex flex-col flex-1">
                  <h3 className="text-sm font-black uppercase leading-tight mb-2">{bonus.title}</h3>
                  <p className="text-slate-600 text-xs sm:text-sm mb-4 flex-1 leading-relaxed">{bonus.desc}</p>
                  <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                    <span className="text-slate-400 line-through text-xs font-medium">De R$ {bonus.old}</span>
                    <span className="text-emerald-600 font-black uppercase text-xs bg-emerald-50 px-2.5 py-1 rounded-full">VAI SAIR DE GRAÇA</span>
                  </div>
                </div>
              </div>
            ))}

            {/* Special World Cup */}
            <div className="bg-white border-4 border-orange-500 rounded-2xl overflow-hidden shadow-2xl shadow-orange-500/20 flex flex-col group sm:col-span-2 lg:col-span-1">
              <div className="bg-slate-950 text-white text-center py-2.5 font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2">
                <span className="text-orange-500">🚨</span> EXCLUSIVO DA TEMPORADA (LOTE 1 PREMIUM)
              </div>
              <div className="aspect-[4/3] relative overflow-hidden bg-slate-100">
                <img src="https://i.ibb.co/p60MG7Zq/Gemini-Generated-Image-ovyz9fovyz9fovyz.png" alt="Copa do Mundo" loading="lazy" referrerPolicy="no-referrer" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-3 right-3 bg-black/70 text-white px-2.5 py-1 rounded-full text-xs font-black border border-white/10">⚽ ESPECIAL</div>
              </div>
              <div className="p-4 sm:p-5 flex flex-col flex-1 bg-gradient-to-b from-white to-orange-50/40">
                <h3 className="text-sm font-black uppercase leading-tight mb-2 text-orange-600">⚽ Módulo Especial: Coleção Copa do Mundo 3D</h3>
                <p className="text-slate-700 text-xs sm:text-sm mb-4 flex-1 leading-relaxed">Modelos exclusivos com tema de futebol e Copa do Mundo: troféus icônicos, mini-estádios, bolas texturizadas e itens de decoração com alta demanda para você lucrar muito durante a temporada de jogos!</p>
                <div className="flex items-center justify-between pt-3 border-t border-orange-200">
                  <span className="text-slate-400 line-through text-xs font-medium">De R$ 39,90</span>
                  <span className="text-white font-black uppercase text-xs bg-orange-500 px-2.5 py-1 rounded-full shadow">INCLUSO DE GRAÇA HOJE</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6 sm:p-8 rounded-2xl text-white text-center shadow-xl shadow-orange-500/20 max-w-3xl mx-auto">
            <p className="text-base sm:text-lg font-black leading-snug">
              ⚡ Estes 11 módulos bônus valem{" "}
              <span className="line-through opacity-70">R$ 318,90</span>{" "}
              no total e somente hoje você recebe todos eles{" "}
              <span className="bg-white text-orange-600 px-2 py-0.5 rounded-lg inline-block text-sm sm:text-base">GRATUITAMENTE</span>{" "}
              ao escolher o Pacote Premium de R$ 29,90!
            </p>
          </div>
        </div>
      </AnimatedSection>

      {/* ── TESTIMONIALS ── */}
      <AnimatedSection className="py-16 sm:py-20 px-4 sm:px-6 bg-zinc-900 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block bg-orange-500/10 text-orange-400 font-bold px-4 py-1.5 rounded-full text-xs uppercase tracking-widest mb-4 border border-orange-500/20">
              CLIENTES REAIS
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase">
              VEJA O QUE OS NOSSOS CLIENTES ESTÃO DIZENDO:
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6">
            {[
              { name: "Mariana S.", img: "https://i.ibb.co/tMZxHnnP/Personagem-14-Copia.jpg", text: "Tenho uma Ender 3 basicona e fiquei com medo dos modelos não rodarem. Mas já fiz mais de 40 impressões aqui e tudo saindo perfeitamente. Os arquivos são super compatíveis." },
              { name: "Adriano P.", img: "https://i.ibb.co/LdBzYHLw/Depoimento-05.png", text: "Tinha duvida se ia conseguir vender mas comecei postando no marketplace, primeira semana nada. Ajustei fotos e preço, na segunda semana começou a vender. Hoje, 1 mês depois, já tenho cliente fixo pedindo toda semana. Ter 90 mil opções ajuda demais pra testar vários nichos." },
              { name: "João D.", img: "https://i.ibb.co/mr4TPkhd/Depoimento-08.png", text: "Achei que ia ser muita quantidade para pouca qualidade, mas testei uns 20 modelos aleatórios e todos imprimiram perfeito. Zero arquivo corrompido, zero erro. Tem coisa muito bem feita no pack." }
            ].map((item, i) => (
              <div key={i} className="bg-zinc-950 border border-zinc-800 p-5 sm:p-7 rounded-2xl hover:-translate-y-1 transition-transform duration-300 flex flex-col">
                <div className="flex gap-0.5 mb-4">
                  {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-orange-500 text-orange-500" />)}
                </div>
                <p className="text-zinc-300 text-sm sm:text-base mb-6 italic flex-1">"{item.text}"</p>
                <div className="flex items-center gap-3 mt-auto pt-4 border-t border-zinc-800">
                  <img src={item.img} alt={item.name} loading="lazy" referrerPolicy="no-referrer" className="w-12 h-12 rounded-full object-cover border-2 border-orange-500 shrink-0" />
                  <div>
                    <h4 className="font-bold text-sm sm:text-base">{item.name}</h4>
                    <span className="text-orange-400 text-xs font-medium">Cliente Verificado ✓</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* ── PRICING ── */}
      <AnimatedSection id="pricing" className="py-16 sm:py-20 px-4 sm:px-6 bg-white text-slate-950">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block bg-orange-100 text-orange-600 font-bold px-4 py-1.5 rounded-full text-xs uppercase tracking-widest mb-4">
              OFERTA POR TEMPO LIMITADO
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase">
              Oferta Especial — ESCOLHA SEU PACOTE
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8 items-start">

            {/* Basic */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-lg flex flex-col">
              <div className="text-center mb-6">
                <h3 className="text-xl font-black uppercase text-slate-700 mb-4">PACOTE BÁSICO</h3>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="line-through text-slate-400 font-medium text-sm">R$ 60,00</span>
                  <span className="bg-red-100 text-red-600 text-xs font-black px-2 py-0.5 rounded-full">-83%</span>
                </div>
                <div className="text-5xl sm:text-6xl font-black text-slate-950">R$ 10,00</div>
              </div>

              <ul className="space-y-3 mb-8 flex-1 text-sm sm:text-base">
                <li className="flex items-start gap-2.5 font-medium"><span className="shrink-0 text-lg">🛡️</span> GARANTIA DE 14 DIAS</li>
                <li className="flex items-start gap-2.5 font-medium"><span className="shrink-0 text-lg">⚡</span> Acesso vitalício e imediato</li>
                <li className="flex items-start gap-2.5 font-medium"><span className="shrink-0 text-lg">📩</span> ENVIO PELO E-MAIL</li>
                <li className="flex items-start gap-2.5 font-medium"><span className="shrink-0 text-lg">📁</span> Acesso apenas ao Pack Base (+90.000 arquivos)</li>
                <li className="flex items-start gap-2.5 text-slate-400 line-through"><span className="shrink-0 text-lg">❌</span> NENHUM dos Módulos Exclusivos</li>
                <li className="flex items-start gap-2.5 text-slate-400 line-through"><span className="shrink-0 text-lg">❌</span> SEM suporte via WhatsApp</li>
                <li className="flex items-start gap-2.5 text-slate-400 line-through"><span className="shrink-0 text-lg">❌</span> SEM o Bônus Especial da Copa</li>
              </ul>

              <Button onClick={() => handlePurchase("PACOTE BÁSICO")} className="w-full h-13 py-3.5 text-base font-black uppercase bg-emerald-500 hover:bg-emerald-600 text-white">
                QUERO ACESSO BÁSICO
              </Button>
            </div>

            {/* Premium */}
            <div className="bg-white border-4 border-orange-500 rounded-2xl p-6 sm:p-8 shadow-2xl relative flex flex-col">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-orange-500 text-white text-xs font-black px-5 py-1.5 rounded-full uppercase tracking-widest shadow-lg whitespace-nowrap">
                O MAIS ESCOLHIDO ⭐
              </div>

              <div className="text-center mb-6 pt-2">
                <h3 className="text-xl font-black uppercase text-orange-600 mb-4">PACOTE PREMIUM</h3>
                <div className="flex items-center justify-center flex-wrap gap-2 mb-2">
                  <span className="line-through text-slate-400 font-medium text-sm">R$ 180,00</span>
                  <span className="bg-yellow-100 text-yellow-700 text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Star className="w-3 h-3 fill-yellow-600" /> 4.98 (5286)
                  </span>
                </div>
                <div className="text-5xl sm:text-6xl font-black text-slate-950">R$ 29,90</div>
              </div>

              <ul className="space-y-2.5 mb-8 flex-1 text-sm sm:text-base">
                <li className="flex items-start gap-2.5 font-bold"><span className="shrink-0 text-lg">🛡️</span> GARANTIA DE 14 DIAS</li>
                <li className="flex items-start gap-2.5 font-bold"><span className="shrink-0 text-lg">⚡</span> Acesso vitalício e imediato</li>
                <li className="flex items-start gap-2.5 font-bold text-orange-600"><span className="shrink-0 text-lg">💬</span> Suporte exclusivo via WhatsApp</li>
                <li className="flex items-start gap-2.5 font-bold"><span className="shrink-0 text-lg">📩</span> ENVIO PELO E-MAIL</li>
                <li className="flex items-start gap-2.5 font-black bg-orange-50 p-2 rounded-xl"><span className="shrink-0 text-lg">📂</span> ACESSO A TODOS OS MÓDULOS</li>
                <li className="pt-1 font-black text-slate-800 text-sm">🎁 BÔNUS EXCLUSIVOS INCLUSOS:</li>
                {["Veículos 3D Profissionais", "Heróis da Marvel", "Chaveiros Personalizados", "Utensílios Domésticos", "Modelos Articulados", "Clássicos dos Desenhos", "Máscaras 3D", "Pokémon 3D", "Mascotes Premium", "Efeito Bordados"].map((b, i) => (
                  <li key={i} className="flex items-start gap-2 pl-1 text-xs sm:text-sm font-medium">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    MÓDULO EXCLUSIVO: {b}
                  </li>
                ))}
                <li className="flex items-start gap-2 pl-1 font-black text-orange-600 bg-orange-50 p-2 rounded-xl text-xs sm:text-sm">
                  <span className="text-lg shrink-0">⚽</span> SUPER BÔNUS: Módulo Copa do Mundo 3D
                </li>
              </ul>

              <motion.div animate={{ scale: [1, 1.03, 1] }} transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}>
                <Button onClick={() => handlePurchase("PACOTE PREMIUM")} className="w-full h-14 text-lg font-black uppercase bg-emerald-500 hover:bg-emerald-600 text-white shadow-xl shadow-emerald-500/20">
                  QUERO ACESSO PREMIUM
                </Button>
              </motion.div>
            </div>
          </div>

          <p className="text-center text-orange-600 font-black mt-10 text-xs sm:text-sm uppercase tracking-wider">
            ⚽ TEMPORADA DA COPA! Aproveite os descontos especiais deste mês.
          </p>
        </div>
      </AnimatedSection>

      {/* ── GUARANTEE + FAQ ── */}
      <AnimatedSection className="py-16 sm:py-20 px-4 sm:px-6 bg-slate-50 text-slate-950">
        <div className="max-w-3xl mx-auto">

          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 shadow-lg text-center mb-16">
            <ShieldCheck className="w-16 h-16 text-emerald-500 mx-auto mb-5" />
            <h3 className="text-xl sm:text-2xl font-black uppercase mb-4">GARANTIA INCONDICIONAL DE 14 DIAS</h3>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Nós confiamos tanto na qualidade do Mega Pack STL que oferecemos uma garantia total de 14 dias. Se, por qualquer motivo, você não ficar satisfeito com o material, basta solicitar o reembolso dentro desse prazo e devolvemos 100% do seu dinheiro, sem burocracia e sem perguntas.
            </p>
          </div>

          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-black uppercase">PERGUNTAS FREQUENTES</h2>
          </div>

          <Accordion type="single" collapsible className="w-full bg-white rounded-2xl border border-slate-200 overflow-hidden divide-y divide-slate-100">
            {[
              { q: "Esses arquivos funcionam na minha impressora 3D?", a: "Sim! Todos os arquivos STL são 100% universais e compatíveis com qualquer impressora 3D do mercado, seja de filamento (FDM) ou resina (SLA), incluindo marcas populares como Creality, Ender, Anycubic, Elegoo, Bambu Lab, Prusa, etc. Basta fatiar no seu programa preferido (Cura, PrusaSlicer, Chitubox) e imprimir!" },
              { q: "Como eu acesso os arquivos depois de pagar?", a: "O envio é automático e imediato. Assim que o pagamento for aprovado, você receberá instantaneamente um e-mail com os links organizados por categorias e pastas para download e visualização. Compras via Pix ou cartão são liberadas na mesma hora!" },
              { q: "Os arquivos estão organizados?", a: "Sim, perfeitamente! Esqueça aquela bagunça de arquivos desordenados. Todo o nosso acervo foi cuidadosamente catalogado por categorias e nichos específicos (Ex: Heróis, Suportes, Articulados, Utilidades) em pastas de fácil visualização." },
              { q: "Preciso baixar todos os arquivos de uma vez?", a: "Não! Como o seu acesso é vitalício, você pode baixar apenas as pastas e modelos que for imprimir no momento. Os arquivos ficam salvos em nuvem segura para você baixar quando e onde quiser." },
              { q: "Preciso saber modelar em 3D pra usar o pack?", a: "Absolutamente não! Todos os arquivos já são modelos prontos em formato STL. Você não precisa fazer nenhum ajuste complexo ou modelar nada do zero, basta fatiar e imprimir." },
              { q: "Posso vender as impressões dos modelos?", a: "Sim! O objetivo do Mega Pack STL é justamente fornecer a você modelos com altíssima demanda comercial para que você possa imprimir em escala e revendê-los na Shopee, OLX, Mercado Livre, redes sociais ou loja física." },
              { q: "Vale a pena pagar por isso se há modelos grátis?", a: "Com certeza! Ficar caçando modelos grátis na internet custa muito tempo, e a maioria deles vem desalinhada, corrompida ou com problemas que causam desperdício de filamento. Nosso pack oferece comodidade, arquivos profissionais e testados, suporte e bônus valiosos por um valor extremamente baixo." },
              { q: "Recebo o acesso na hora?", a: "Sim! Se o pagamento for feito por PIX ou Cartão de Crédito, a liberação ocorre instantaneamente em poucos minutos após a confirmação diretamente no seu e-mail." },
              { q: "Funciona pra iniciante em impressão 3D?", a: "Sim, é perfeito para quem está começando! Você pula a parte difícil de buscar arquivos e já começa com um catálogo gigante de produtos validados, evitando o desperdício de tempo e material." }
            ].map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border-0 px-5">
                <AccordionTrigger className="text-left font-bold text-sm sm:text-base hover:text-orange-600 py-5 [&>svg]:shrink-0">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 text-sm sm:text-base leading-relaxed pb-5">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </AnimatedSection>

      {/* ── FOOTER ── */}
      <footer className="bg-slate-950 text-white pt-16 pb-10 px-4 sm:px-6 text-center border-t border-slate-900">
        <div className="max-w-3xl mx-auto flex flex-col items-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase mb-3 tracking-tight">Mega Pack STL</h2>
          <p className="text-sm sm:text-base text-slate-400 mb-10">O maior e mais completo pacote de arquivos STL para impressão 3D do Brasil.</p>

          <button
            onClick={scrollToPricing}
            className="h-14 px-8 text-base sm:text-lg font-black uppercase bg-orange-500 hover:bg-orange-600 text-white shadow-xl shadow-orange-500/20 rounded-full w-full max-w-sm mb-12 transition-all active:scale-95"
          >
            BAIXAR PACOTE AGORA!
          </button>

          <div className="space-y-4 text-xs sm:text-sm text-slate-500 font-medium">
            <p className="text-orange-400">Email para suporte: suporte.megapackstl@gmail.com</p>
            <div className="flex items-center justify-center gap-4">
              <a href="#" className="hover:text-white transition-colors underline">Termos de Uso</a>
              <span>|</span>
              <a href="#" className="hover:text-white transition-colors underline">Política de Privacidade</a>
            </div>
            <p>© 2026 Mega Pack STL — Todos os direitos reservados.</p>
            <p className="max-w-xl mx-auto text-xs opacity-50">
              Este site não é afiliado ao Facebook ou a qualquer entidade do Facebook. Depois que você sair do Facebook, a responsabilidade não é deles e sim do nosso site.
            </p>
          </div>
        </div>
      </footer>

      {/* SOCIAL PROOF TOAST */}
      <AnimatePresence>
        {purchaseNotification && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-4 left-3 z-[100] max-w-[260px] sm:max-w-[280px] bg-white text-slate-900 p-3.5 rounded-2xl shadow-2xl border border-slate-100 flex items-start gap-3"
          >
            <div className="bg-orange-100 p-2 rounded-full shrink-0">
              <ShoppingBag className="w-4 h-4 text-orange-600" />
            </div>
            <div>
              <p className="font-bold text-xs leading-tight mb-1">
                <span className="text-orange-600">{purchaseNotification.name}</span> acabou de comprar!
              </p>
              <p className="text-[10px] text-slate-500 font-medium mb-0.5">Plano: PACOTE PREMIUM 2026</p>
              <p className="text-[10px] text-slate-400">{purchaseNotification.city} • Há poucos segundos</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* UPSELL DIALOG */}
      <Dialog open={showUpsell} onOpenChange={setShowUpsell}>
        <DialogContent className="w-[92vw] max-w-sm bg-white text-slate-950 p-0 overflow-hidden border-0 rounded-2xl">
          <div className="bg-orange-500 text-white text-center py-4 px-6">
            <DialogTitle className="text-xl sm:text-2xl font-black uppercase">OFERTA ESPECIAL!</DialogTitle>
          </div>
          <div className="p-5 sm:p-6">
            <DialogHeader>
              <DialogDescription className="text-sm sm:text-base font-medium text-slate-700 mb-5 text-center leading-relaxed">
                Por apenas <span className="font-black text-slate-950">R$ 14,90</span>, você leva o{" "}
                <span className="text-orange-600 font-black">PACOTE PREMIUM completo</span> com mais de 90.000 STL e recebe{" "}
                <span className="font-black">TODOS os bônus exclusivos</span>.
              </DialogDescription>
            </DialogHeader>

            <div className="bg-orange-50 border border-orange-100 rounded-xl p-4 mb-5 space-y-2.5">
              {["Coleção Heróis da Marvel Completa", "Pack de Veículos 3D Profissionais", "Utensílios Domésticos práticos", "Modelos Flexíveis & Articulados", "⚽ Módulo Especial Copa do Mundo"].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-xs sm:text-sm font-bold">
                  <Check className="w-4 h-4 text-orange-600 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-2.5">
              <Button onClick={() => handlePurchase("Oferta Especial Upgrade")} className="w-full h-12 text-sm sm:text-base font-black uppercase bg-emerald-500 hover:bg-emerald-600 text-white">
                Quero essa oferta premium
              </Button>
              <Button onClick={confirmBasicOnly} variant="ghost" className="w-full text-slate-400 hover:text-slate-600 text-xs font-black uppercase h-auto py-1.5">
                QUERO OFERTA DE 10
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

    </div>
  );
}
