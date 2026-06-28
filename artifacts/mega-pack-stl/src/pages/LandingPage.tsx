import React, { useState, useEffect, useRef } from "react";
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
  Wrench
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

function AnimatedSection({ children, className, id }: { children: React.ReactNode, className?: string, id?: string }) {
  return (
    <section id={id} className={className}>
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6, ease: "easeOut" }}>
        {children}
      </motion.div>
    </section>
  );
}

export default function LandingPage() {
  const [purchaseNotification, setPurchaseNotification] = useState<{name: string, city: string} | null>(null);
  const [showUpsell, setShowUpsell] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const showNotification = () => {
      const name = buyerNames[Math.floor(Math.random() * buyerNames.length)];
      const city = buyerCities[Math.floor(Math.random() * buyerCities.length)];
      setPurchaseNotification({ name, city });
      
      timeoutId = setTimeout(() => {
        setPurchaseNotification(null);
      }, 5000);
    };

    const initialTimeout = setTimeout(showNotification, 4000);
    const intervalId = setInterval(showNotification, 15000);

    return () => {
      clearTimeout(initialTimeout);
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselItems.length);
    }, 4000);
    return () => clearInterval(intervalId);
  }, []);

  const scrollToPricing = () => {
    document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" });
  };

  const handlePurchase = (productName: string) => {
    if (productName === "PACOTE BÁSICO") {
      setShowUpsell(true);
    } else if (productName === "PACOTE PREMIUM") {
      window.location.href = "https://checkout.educafacl.shop/VCCL1O8SCNER";
    } else if (productName === "Oferta Especial Upgrade") {
      window.location.href = "https://checkout.educafacl.shop/VCCL1O8SCNF7";
    } else {
      window.location.href = "https://checkout.educafacl.shop/VCCL1O8SCNEQ";
    }
  };

  const confirmBasicOnly = () => {
    setShowUpsell(false);
    window.location.href = "https://checkout.educafacl.shop/VCCL1O8SCNEQ";
  };

  const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? carouselItems.length - 1 : prev - 1));
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % carouselItems.length);

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-50 overflow-x-hidden">
      
      {/* SECTION 0: STICKY HEADER */}
      <div className="sticky top-0 z-50 bg-orange-600 text-slate-950 py-3 px-4 text-center font-bold text-sm md:text-base uppercase flex items-center justify-center gap-2 shadow-md">
        <span className="animate-bounce inline-block">⚽</span>
        <span>TEMPORADA DA COPA! Aproveite os descontos especiais deste mês.</span>
        <span className="animate-bounce inline-block">⚽</span>
      </div>

      {/* SECTION 1: HERO */}
      <AnimatedSection className="pt-16 pb-24 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <div className="flex-1 space-y-8 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-1">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />)}
              <span className="ml-2 font-bold text-yellow-400 text-sm tracking-wider">4,98 (5286 AVALIAÇÕES)</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase leading-tight tracking-tight">
              TRANSFORME SUA IMPRESSORA 3D EM UMA <span className="text-orange-500">MÁQUINA DE LUCRO</span> COM MAIS DE 90 MIL PROJETOS!
            </h1>
            
            <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Com esse PACK você tem acesso imediato a milhares de modelos prontos para lucrar! Não precisa criar nada do zero, basta baixar e imprimir.
            </p>

            <ul className="space-y-4 text-left max-w-md mx-auto lg:mx-0">
              {["Arquivos testados, otimizados e organizados por nichos.", "Modelos que já vendem na Shopee e OLX.", "Acesso imediato."].map((text, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="mt-1 min-w-[24px]">
                    <div className="w-6 h-6 rounded-full bg-orange-500/20 flex items-center justify-center">
                      <div className="w-2.5 h-2.5 rounded-full bg-orange-500" />
                    </div>
                  </div>
                  <span className="text-lg font-medium">{text}</span>
                </li>
              ))}
            </ul>

            <div className="pt-4 flex flex-col items-center lg:items-start gap-4">
              <div className="flex items-center gap-2 text-orange-500 font-bold uppercase tracking-widest text-sm animate-pulse">
                <span>ASSISTA AO VÍDEO DE APRESENTAÇÃO</span>
                <ChevronRight className="w-5 h-5" />
              </div>
              <div className="flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-2 text-sm font-semibold text-slate-400">
                <span>+90.000 arquivos STL</span>
                <span className="hidden sm:inline">•</span>
                <span>4.98/5 avaliações</span>
                <span className="hidden sm:inline">•</span>
                <span>Acesso imediato</span>
              </div>
            </div>
          </div>

          <div className="w-full max-w-sm lg:w-[360px] relative shrink-0">
            <div className="absolute -inset-4 bg-orange-500/20 blur-2xl rounded-[3rem] -z-10" />
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 shadow-2xl relative z-10">
              <div className="aspect-[9/16] relative rounded-2xl overflow-hidden bg-slate-950">
                <iframe src="https://player.vimeo.com/video/1204401314" className="absolute top-0 left-0 w-full h-full" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />
              </div>
              <Button onClick={scrollToPricing} className="w-full mt-4 h-14 text-lg font-bold uppercase bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-xl shadow-orange-500/20">
                🚀 VER OFERTAS AGORA
              </Button>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* SECTION 2: PAIN AGITATION */}
      <AnimatedSection className="py-24 px-4 md:px-8 bg-white text-slate-950">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-block bg-red-100 text-red-600 font-bold px-4 py-1.5 rounded-full text-sm uppercase tracking-widest mb-6">
            FACILITE SEU PROCESSO
          </div>
          <h2 className="text-3xl md:text-5xl font-black uppercase mb-16 max-w-4xl mx-auto">
            ESTE PACK FOI FEITO PARA FACILITAR A SUA VIDA...
          </h2>

          <div className="grid sm:grid-cols-2 gap-6 mb-16">
            {[
              "Chega de perder horas procurando modelos 3D e acabar com arquivos ruins.",
              "Pare de gastar caro comprando modelos individuais que nem sempre valem o investimento.",
              "Diga adeus à frustração de ter sua impressora parada por falta de variedade.",
              "Comece a lucrar de verdade com milhares de modelos prontos para imprimir e vender."
            ].map((text, i) => (
              <div key={i} className="bg-slate-50 p-8 rounded-3xl border border-slate-200 text-left flex items-start gap-4">
                <Flame className="w-8 h-8 text-red-500 shrink-0 mt-1" />
                <p className="text-xl font-bold leading-tight">{text}</p>
              </div>
            ))}
          </div>

          <div className="border-2 border-orange-500 bg-orange-50 p-8 md:p-12 rounded-3xl max-w-4xl mx-auto relative">
            <span className="text-6xl text-orange-200 absolute top-4 left-6 font-serif">"</span>
            <p className="text-xl md:text-2xl font-bold italic relative z-10">
              Ter o arquivo certo na hora certa muda tudo. Não desperdice filamento com modelos ruins ou mal planejados.
            </p>
          </div>
        </div>
      </AnimatedSection>

      {/* SECTION 3: BENEFITS + CAROUSEL */}
      <AnimatedSection className="py-24 px-4 md:px-8 bg-slate-950 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-orange-500/5 blur-[100px] -z-10" />
        
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block bg-orange-500/10 text-orange-500 font-bold px-4 py-1.5 rounded-full text-sm uppercase tracking-widest mb-6 border border-orange-500/20">
              BENEFÍCIOS REAIS
            </div>
            <h2 className="text-3xl md:text-5xl font-black uppercase max-w-4xl mx-auto">
              COM NOSSO MATERIAL VOCÊ TERÁ:
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 mb-24">
            {[
              { icon: Box, title: "IDEIAS INFINITAS PARA VENDER", desc: "Tenha acesso a uma biblioteca com milhares de temas e categorias." },
              { icon: Clock, title: "MAIS TEMPO LIVRE", desc: "Tudo organizado e separado por pastas, pronto para imprimir." },
              { icon: Trophy, title: "LUCROS PREVISÍVEIS", desc: "Modelos testados e aprovados que vendem com frequência e garantem retorno constante." },
              { icon: Zap, title: "ACESSO RÁPIDO E SEGURO", desc: "Baixe tudo de forma simples e use no computador, celular ou HD externo." }
            ].map((item, i) => (
              <div key={i} className="bg-slate-900 border border-slate-800 border-l-4 border-l-orange-500 p-8 rounded-2xl flex items-start gap-6">
                <div className="p-3 bg-orange-500/10 rounded-xl shrink-0">
                  <item.icon className="w-8 h-8 text-orange-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-4xl font-black uppercase">
              VEJA OS MODELOS QUE <span className="text-orange-500">VOCÊ IRÁ RECEBER:</span>
            </h3>
          </div>

          <div className="relative max-w-5xl mx-auto">
            <div className="overflow-hidden px-2 pb-12 pt-4">
              <div 
                className="flex transition-transform duration-500 ease-in-out" 
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {carouselItems.map((item, i) => (
                  <div key={i} className="min-w-full md:min-w-[50%] lg:min-w-[33.333%] p-3 shrink-0">
                    <div className="bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 shadow-xl group">
                      <div className="aspect-[4/3] relative overflow-hidden bg-slate-950">
                        <div className="absolute top-4 left-4 z-10 bg-orange-500 text-white text-xs font-black px-3 py-1 rounded-full uppercase">
                          {item.badge}
                        </div>
                        <img src={item.img} alt={item.title} loading="lazy" referrerPolicy="no-referrer" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      </div>
                      <div className="p-6">
                        <h4 className="text-xl font-bold mb-3">{item.title}</h4>
                        <p className="text-sm text-slate-400">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <button onClick={prevSlide} className="absolute top-1/2 -translate-y-1/2 -left-4 md:-left-12 w-12 h-12 flex items-center justify-center bg-slate-900 border border-slate-800 rounded-full hover:bg-orange-500 hover:border-orange-500 transition-colors z-10">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button onClick={nextSlide} className="absolute top-1/2 -translate-y-1/2 -right-4 md:-right-12 w-12 h-12 flex items-center justify-center bg-slate-900 border border-slate-800 rounded-full hover:bg-orange-500 hover:border-orange-500 transition-colors z-10">
              <ChevronRight className="w-6 h-6" />
            </button>

            <div className="flex justify-center gap-2 mt-4">
              {carouselItems.map((_, i) => (
                <button 
                  key={i} 
                  onClick={() => setCurrentSlide(i)}
                  className={cn("w-2.5 h-2.5 rounded-full transition-colors", currentSlide === i ? "bg-orange-500" : "bg-slate-800")}
                />
              ))}
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* SECTION 4: COMPARISON TABLE */}
      <AnimatedSection className="py-24 px-4 md:px-8 bg-white text-slate-950">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block bg-rose-100 text-rose-600 font-bold px-4 py-1.5 rounded-full text-sm uppercase tracking-widest mb-6">
              COMPARAÇÃO REAL
            </div>
            <h2 className="text-3xl md:text-5xl font-black uppercase">
              POR QUE SOMOS A MELHOR OPÇÃO?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8">
              <h3 className="text-xl font-bold mb-8 text-slate-600 flex items-center gap-2">
                <span className="text-2xl">❌</span> SEM O NOSSO MEGA PACK STL
              </h3>
              <ul className="space-y-6">
                {[
                  "Perde tempo caçando arquivos em sites e grupos",
                  "Encontra modelos quebrados, incompletos ou incompatíveis",
                  "Precisa pagar caro por cada modelo individual",
                  "Fica limitado a poucos projetos e ideias",
                  "Corre risco com arquivos maliciosos"
                ].map((text, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <XCircle className="w-6 h-6 text-slate-400 shrink-0 mt-0.5" />
                    <span className="text-lg text-slate-600 font-medium">{text}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-slate-950 border-2 border-orange-500 rounded-3xl p-8 shadow-2xl shadow-orange-500/10 text-white relative">
              <div className="absolute -top-4 right-8 bg-orange-500 text-white text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
                Sua Melhor Escolha
              </div>
              <h3 className="text-xl font-bold mb-8 text-white flex items-center gap-2">
                <span className="text-2xl">✅</span> COM O NOSSO MEGA PACK STL
              </h3>
              <ul className="space-y-6">
                {[
                  "Acesso instantâneo a mais de 90 mil modelos organizados",
                  "Arquivos testados, compatíveis e prontos para uso",
                  "Economia total, sem mensalidade nem taxas extras",
                  "Material exclusivo com temas variados",
                  "Suporte completo e acesso vitalício"
                ].map((text, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <CheckCircle2 className="w-6 h-6 text-orange-500 shrink-0 mt-0.5" />
                    <span className="text-lg font-medium">{text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* SECTION 5: FACILIDADES */}
      <AnimatedSection className="py-24 px-4 md:px-8 bg-zinc-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block bg-orange-500/10 text-orange-500 font-bold px-4 py-1.5 rounded-full text-sm uppercase tracking-widest mb-6 border border-orange-500/20">
              FACILIDADE TOTAL
            </div>
            <h2 className="text-3xl md:text-5xl font-black uppercase max-w-4xl mx-auto">
              FACILIDADES QUE SÓ ESSE PACK OFERECE!
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-8">
            {[
              { icon: Clock, title: "MAIS TEMPO PARA LUCRAR", desc: "Pare de perder horas procurando arquivos e use esse tempo para imprimir e vender mais.", gradient: "from-orange-500 to-amber-500" },
              { icon: ShoppingBag, title: "UM NEGÓCIO PRONTO", desc: "Com milhares de modelos disponíveis, você começa a lucrar rapidamente, mesmo com pouca experiência.", gradient: "from-cyan-500 to-blue-500" },
              { icon: Sparkles, title: "LIBERDADE PARA PRODUZIR", desc: "Imprima o que quiser, quando quiser, e tenha liberdade total pra gerenciar suas vendas.", gradient: "from-emerald-500 to-teal-500" },
              { icon: Zap, title: "VENDAS CONSISTENTES", desc: "Use modelos com alta demanda e conquiste um fluxo constante de pedidos e faturamento.", gradient: "from-yellow-400 to-orange-500" }
            ].map((item, i) => (
              <div key={i} className="bg-zinc-950 p-8 rounded-3xl relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300">
                <div className={`absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r ${item.gradient}`} />
                <div className="absolute -top-12 -right-12 w-32 h-32 bg-white/5 rounded-full blur-2xl group-hover:bg-white/10 transition-colors" />
                
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 bg-gradient-to-br ${item.gradient}`}>
                  <item.icon className="w-7 h-7 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold mb-4 uppercase">{item.title}</h3>
                <p className="text-zinc-400 text-lg leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* SECTION 6: BONUS MODULES */}
      <AnimatedSection className="py-24 px-4 md:px-8 bg-white text-slate-950 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-orange-500/5 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-20">
            <div className="inline-block bg-orange-100 text-orange-600 font-bold px-4 py-1.5 rounded-full text-sm uppercase tracking-widest mb-6">
              SUPER COMBINAÇÃO
            </div>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black uppercase mb-6 max-w-5xl mx-auto leading-tight">
              COMPRE HOJE O PACOTE PREMIUM E GANHE <span className="text-orange-500">11 MÓDULOS EXCLUSIVOS</span> 🎁
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Garantindo seu acesso à oferta Premium hoje, você recebe gratuitamente este arsenal de pacotes especiais avaliados em mais de R$ 300,00!
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
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
              { title: "Modelos Efeito Bordados", img: "https://i.ibb.co/Kpt4fMRW/Screenshot-18.png", old: "14,90", desc: "Dezenas de modelos com efeito texturizado de bordado para impressão 3D. Placas, quadros e peças decorativas artísticas com acabamento único." }
            ].map((item, i) => (
              <div key={i} className="bg-white border-2 border-slate-100 hover:border-orange-500 rounded-3xl overflow-hidden transition-colors shadow-xl shadow-slate-200/50 flex flex-col group">
                <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white text-center py-2 font-bold text-xs uppercase tracking-widest">
                  MÓDULO EXCLUSIVO
                </div>
                <div className="aspect-[4/3] bg-slate-100 overflow-hidden relative">
                  <img src={item.img} alt={item.title} loading="lazy" referrerPolicy="no-referrer" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-black uppercase leading-tight mb-3">{item.title}</h3>
                  <p className="text-slate-600 text-sm mb-6 flex-1">{item.desc}</p>
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
                    <span className="text-slate-400 line-through font-medium">De R$ {item.old}</span>
                    <span className="text-emerald-600 font-black uppercase text-sm bg-emerald-50 px-3 py-1 rounded-full">VAI SAIR DE GRAÇA</span>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Special World Cup Bonus */}
            <div className="bg-white border-4 border-orange-500 rounded-3xl overflow-hidden shadow-2xl shadow-orange-500/20 flex flex-col group md:col-span-2 lg:col-span-1">
              <div className="bg-slate-950 text-white text-center py-2 font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2">
                <span className="text-orange-500">🚨</span> EXCLUSIVO DA TEMPORADA (LOTE 1 PREMIUM)
              </div>
              <div className="aspect-[4/3] bg-slate-100 overflow-hidden relative">
                <img src="https://i.ibb.co/p60MG7Zq/Gemini-Generated-Image-ovyz9fovyz9fovyz.png" alt="Copa do Mundo" loading="lazy" referrerPolicy="no-referrer" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-black flex items-center gap-1 border border-white/10">
                  <span>⚽</span> ESPECIAL
                </div>
              </div>
              <div className="p-6 flex flex-col flex-1 bg-gradient-to-b from-white to-orange-50/50">
                <h3 className="text-xl font-black uppercase leading-tight mb-3 text-orange-600">Coleção Copa do Mundo 3D</h3>
                <p className="text-slate-700 text-sm mb-6 flex-1 font-medium">Modelos exclusivos com tema de futebol e Copa do Mundo: troféus icônicos, mini-estádios, bolas texturizadas e itens de decoração com alta demanda para você lucrar muito durante a temporada de jogos!</p>
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-orange-200">
                  <span className="text-slate-400 line-through font-medium">De R$ 39,90</span>
                  <span className="text-white font-black uppercase text-sm bg-orange-500 px-3 py-1 rounded-full shadow-md">INCLUSO DE GRAÇA HOJE</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-8 md:p-12 rounded-3xl text-white text-center shadow-2xl shadow-orange-500/20 max-w-4xl mx-auto transform hover:scale-[1.02] transition-transform">
            <p className="text-xl md:text-2xl font-black leading-tight">
              ⚡ Estes 11 módulos bônus valem R$ 318,90 no total e somente hoje você recebe todos eles GRATUITAMENTE ao escolher o Pacote Premium de R$ 29,90!
            </p>
          </div>
        </div>
      </AnimatedSection>

      {/* SECTION 7: TESTIMONIALS */}
      <AnimatedSection className="py-24 px-4 md:px-8 bg-zinc-900 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block bg-orange-500/10 text-orange-500 font-bold px-4 py-1.5 rounded-full text-sm uppercase tracking-widest mb-6 border border-orange-500/20">
              CLIENTES REAIS
            </div>
            <h2 className="text-3xl md:text-5xl font-black uppercase max-w-4xl mx-auto">
              Depoimentos Reais - VEJA O QUE OS NOSSOS CLIENTES ESTÃO DIZENDO:
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Mariana S.", img: "https://i.ibb.co/tMZxHnnP/Personagem-14-Copia.jpg", text: "Tenho uma Ender 3 basicona e fiquei com medo dos modelos não rodarem. Mas já fiz mais de 40 impressões aqui e tudo saindo perfeitamente. Os arquivos são super compatíveis." },
              { name: "Adriano P.", img: "https://i.ibb.co/LdBzYHLw/Depoimento-05.png", text: "Tinha duvida se ia conseguir vender mas comecei postando no marketplace, primeira semana nada. Ajustei fotos e preço, na segunda semana começou a vender. Hoje, 1 mês depois, já tenho cliente fixo pedindo toda semana. Ter 90 mil opções ajuda demais pra testar vários nichos." },
              { name: "João D.", img: "https://i.ibb.co/mr4TPkhd/Depoimento-08.png", text: "Achei que ia ser muita quantidade para pouca qualidade, mas testei uns 20 modelos aleatórios e todos imprimiram perfeito. Zero arquivo corrompido, zero erro. Tem coisa muito bem feita no pack." }
            ].map((item, i) => (
              <div key={i} className="bg-zinc-950 border border-zinc-800 p-8 rounded-3xl hover:-translate-y-2 transition-transform duration-300">
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, j) => <Star key={j} className="w-5 h-5 fill-orange-500 text-orange-500" />)}
                </div>
                <p className="text-zinc-300 text-lg mb-8 italic">"{item.text}"</p>
                <div className="flex items-center gap-4 mt-auto">
                  <img src={item.img} alt={item.name} loading="lazy" referrerPolicy="no-referrer" className="w-14 h-14 rounded-full object-cover border-2 border-orange-500" />
                  <div>
                    <h4 className="font-bold text-lg">{item.name}</h4>
                    <span className="text-orange-500 text-sm font-medium">Cliente Verificado</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* SECTION 8: PRICING */}
      <AnimatedSection id="pricing" className="py-24 px-4 md:px-8 bg-white text-slate-950 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-orange-100/50 via-white to-white -z-10" />
        
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block bg-orange-100 text-orange-600 font-bold px-4 py-1.5 rounded-full text-sm uppercase tracking-widest mb-6">
              OFERTA POR TEMPO LIMITADO
            </div>
            <h2 className="text-3xl md:text-5xl font-black uppercase max-w-4xl mx-auto">
              Oferta Especial - ESCOLHA SEU PACOTE
            </h2>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-8 lg:gap-12 max-w-4xl mx-auto">
            
            {/* Basic Card */}
            <div className="w-full md:w-1/2 bg-white border border-slate-200 rounded-3xl p-8 shadow-xl flex flex-col h-full self-stretch">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-black uppercase text-slate-800 mb-4">PACOTE BÁSICO</h3>
                <div className="flex items-center justify-center gap-2 text-slate-400 font-medium mb-2">
                  <span className="line-through">R$ 60,00</span>
                  <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-0.5 rounded-full">-83%</span>
                </div>
                <div className="text-5xl font-black text-slate-950 mb-2">R$ 10,00</div>
              </div>

              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-start gap-3 font-medium"><span className="text-xl shrink-0">🛡️</span> GARANTIA DE 14 DIAS</li>
                <li className="flex items-start gap-3 font-medium"><span className="text-xl shrink-0">⚡</span> Acesso vitalício e imediato</li>
                <li className="flex items-start gap-3 font-medium"><span className="text-xl shrink-0">📩</span> ENVIO PELO E-MAIL</li>
                <li className="flex items-start gap-3 font-medium"><span className="text-xl shrink-0">📁</span> Acesso apenas ao Pack Base (+90.000 arquivos)</li>
                <li className="flex items-start gap-3 font-medium text-slate-400 line-through"><span className="text-xl shrink-0">❌</span> NENHUM dos Módulos Exclusivos incluso</li>
                <li className="flex items-start gap-3 font-medium text-slate-400 line-through"><span className="text-xl shrink-0">❌</span> SEM suporte via WhatsApp</li>
                <li className="flex items-start gap-3 font-medium text-slate-400 line-through"><span className="text-xl shrink-0">❌</span> SEM o Bônus Especial da Copa do Mundo</li>
              </ul>

              <Button onClick={() => handlePurchase("PACOTE BÁSICO")} className="w-full h-14 text-lg font-black uppercase bg-emerald-500 hover:bg-emerald-600 text-white mt-auto">
                QUERO ACESSO BÁSICO
              </Button>
            </div>

            {/* Premium Card */}
            <div className="w-full md:w-1/2 bg-white border-4 border-orange-500 rounded-3xl p-8 shadow-2xl relative md:scale-105 z-10 flex flex-col h-full self-stretch">
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-orange-500 text-white text-sm font-black px-6 py-2 rounded-full uppercase tracking-widest shadow-lg whitespace-nowrap">
                O MAIS ESCOLHIDO
              </div>
              
              <div className="text-center mb-8 pt-4">
                <h3 className="text-2xl font-black uppercase text-orange-600 mb-4">PACOTE PREMIUM</h3>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="text-slate-400 font-medium line-through">R$ 180,00</span>
                  <div className="flex items-center bg-yellow-100 text-yellow-700 text-xs font-bold px-2 py-0.5 rounded-full gap-1">
                    <Star className="w-3 h-3 fill-yellow-600" /> 4.98 (5286)
                  </div>
                </div>
                <div className="text-6xl font-black text-slate-950 mb-2">R$ 29,90</div>
              </div>

              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-start gap-3 font-bold"><span className="text-xl shrink-0">🛡️</span> GARANTIA DE 14 DIAS</li>
                <li className="flex items-start gap-3 font-bold"><span className="text-xl shrink-0">⚡</span> Acesso vitalício e imediato</li>
                <li className="flex items-start gap-3 font-bold text-orange-600"><span className="text-xl shrink-0">🛡️</span> Suporte exclusivo via WhatsApp</li>
                <li className="flex items-start gap-3 font-bold"><span className="text-xl shrink-0">📩</span> ENVIO PELO E-MAIL</li>
                <li className="flex items-start gap-3 font-black text-lg bg-orange-50 p-2 rounded-lg -mx-2"><span className="text-xl shrink-0">📂</span> ACESSO A TODOS OS MÓDULOS</li>
                
                <li className="pt-2 font-black text-slate-800">🎁 BÔNUS EXCLUSIVOS INCLUSOS:</li>
                <li className="flex items-start gap-2 pl-2 text-sm font-medium"><Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /> MÓDULO EXCLUSIVO: Veículos 3D Profissionais</li>
                <li className="flex items-start gap-2 pl-2 text-sm font-medium"><Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /> MÓDULO EXCLUSIVO: Coleção Heróis da Marvel</li>
                <li className="flex items-start gap-2 pl-2 text-sm font-medium"><Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /> MÓDULO EXCLUSIVO: Pack de Chaveiros</li>
                <li className="flex items-start gap-2 pl-2 text-sm font-medium"><Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /> MÓDULO EXCLUSIVO: Utensílios Domésticos</li>
                <li className="flex items-start gap-2 pl-2 text-sm font-medium"><Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /> MÓDULO EXCLUSIVO: Modelos Articulados</li>
                <li className="flex items-start gap-2 pl-2 text-sm font-medium"><Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /> MÓDULO EXCLUSIVO: Clássicos dos Desenhos</li>
                <li className="flex items-start gap-2 pl-2 text-sm font-medium"><Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /> MÓDULO EXCLUSIVO: Coleção Máscaras 3D</li>
                <li className="flex items-start gap-2 pl-2 text-sm font-medium"><Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /> MÓDULO EXCLUSIVO: Coleção Pokémon 3D</li>
                <li className="flex items-start gap-2 pl-2 text-sm font-medium"><Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /> MÓDULO EXCLUSIVO: Mascotes Premium</li>
                <li className="flex items-start gap-2 pl-2 text-sm font-medium"><Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /> MÓDULO EXCLUSIVO: Efeito Bordados</li>
                
                <li className="flex items-start gap-2 pl-2 font-black text-orange-600 bg-orange-50 p-2 rounded-lg -mx-2 mt-2">
                  <span className="text-xl shrink-0 mt-0.5">⚽</span> SUPER BÔNUS EXCLUSIVO: Módulo Especial Copa do Mundo
                </li>
              </ul>

              <Button onClick={() => handlePurchase("PACOTE PREMIUM")} className="w-full h-16 text-xl font-black uppercase bg-emerald-500 hover:bg-emerald-600 text-white shadow-xl shadow-emerald-500/30 animate-pulse mt-auto">
                QUERO ACESSO PREMIUM
              </Button>
            </div>
            
          </div>
          
          <p className="text-center text-slate-500 font-bold mt-12 uppercase text-sm">
            ⚽ TEMPORADA DA COPA! Aproveite os descontos especiais deste mês.
          </p>
        </div>
      </AnimatedSection>

      {/* SECTION 9: GUARANTEE + FAQ */}
      <AnimatedSection className="py-24 px-4 md:px-8 bg-slate-50 text-slate-950">
        <div className="max-w-3xl mx-auto">
          
          {/* Guarantee Box */}
          <div className="bg-white border border-slate-200 rounded-3xl p-8 md:p-12 shadow-xl text-center mb-24">
            <ShieldCheck className="w-20 h-20 text-emerald-500 mx-auto mb-6" />
            <h3 className="text-2xl md:text-3xl font-black uppercase mb-4">GARANTIA INCONDICIONAL DE 14 DIAS</h3>
            <p className="text-lg text-slate-600 leading-relaxed">
              Nós confiamos tanto na qualidade do Mega Pack STL que oferecemos uma garantia total de 14 dias. Se, por qualquer motivo, você não ficar satisfeito com o material, basta solicitar o reembolso dentro desse prazo e devolvemos 100% do seu dinheiro, sem burocracia e sem perguntas.
            </p>
          </div>

          {/* FAQ */}
          <div className="mb-12 text-center">
            <h2 className="text-3xl md:text-5xl font-black uppercase">PERGUNTAS FREQUENTES</h2>
          </div>

          <Accordion type="single" collapsible className="w-full bg-white rounded-2xl border border-slate-200 overflow-hidden">
            {[
              { q: "Esses arquivos funcionam na minha impressora 3D?", a: "Sim! Todos os arquivos STL são 100% universais e compatíveis com qualquer impressora 3D do mercado, seja de filamento (FDM) ou resina (SLA), incluindo marcas populares como Creality, Ender, Anycubic, Elegoo, Bambu Lab, Prusa, etc. Basta fatiar no seu programa preferido (Cura, PrusaSlicer, Chitubox) e imprimir!" },
              { q: "Como eu acesso os arquivos depois de pagar?", a: "O envio é automático e imediato. Assim que o pagamento for aprovado, você receberá instantaneamente um e-mail com os links organizados por categorias e pastas para download e visualização. Compras via Pix ou cartão são liberadas na mesma hora!" },
              { q: "Os arquivos estão organizados?", a: "Sim, perfeitamente! Esqueça aquela bagunça de arquivos desordenados. Todo o nosso acervo foi cuidadosamente catalogado por categorias e nichos específicos (Ex: Heróis, Suportes, Articulados, Utilidades) em pastas de fácil visualização." },
              { q: "Preciso baixar todos os arquivos de uma vez?", a: "Não! Como o seu acesso é vitalício, você pode baixar apenas as pastas e modelos que for imprimir no momento. Os arquivos ficam salvos em nuvem segura para você baixar quando e onde quiser." },
              { q: "Preciso saber modelar em 3D pra usar o pack?", a: "Absolutamente não! Todos os arquivos já são modelos prontos in formato STL. Você não precisa fazer nenhum ajuste complexo ou modelar nada do zero, basta fatiar e imprimir." },
              { q: "Posso vender as impressões dos modelos?", a: "Sim! O objetivo do Mega Pack STL é justamente fornecer a você modelos com altíssima demanda comercial para que você possa imprimir em escala e revendê-los na Shopee, OLX, Mercado Livre, redes sociais ou loja física." },
              { q: "Vale a pena pagar por isso se há modelos grátis?", a: "Com certeza! Ficar caçando modelos grátis na internet custa muito tempo, e a maioria deles vem desalinhada, corrompida ou com problemas que causam desperdício de filamento. Nosso pack oferece comodidade, arquivos profissionais e testados, suporte e bônus valiosos por um valor extremamente baixo." },
              { q: "Recebo o acesso na hora?", a: "Sim! Se o pagamento for feito por PIX ou Cartão de Crédito, a liberação ocorre instantaneamente in poucos minutos após a confirmação diretamente no seu e-mail." },
              { q: "Funciona pra iniciante em impressão 3D?", a: "Sim, é perfeito para quem está começando! Você pula a parte difícil de buscar arquivos e já começa com um catálogo gigante de produtos validados, evitando o desperdício de tempo e material." }
            ].map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-b-slate-100 last:border-0 px-6">
                <AccordionTrigger className="text-left font-bold text-lg hover:text-orange-600 py-6">{faq.q}</AccordionTrigger>
                <AccordionContent className="text-slate-600 text-base leading-relaxed pb-6">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

        </div>
      </AnimatedSection>

      {/* SECTION 10: FOOTER */}
      <footer className="bg-slate-950 text-white pt-24 pb-12 px-4 text-center border-t border-slate-900">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          <h2 className="text-4xl md:text-6xl font-black uppercase mb-4 tracking-tighter">Mega Pack STL</h2>
          <p className="text-xl text-slate-400 mb-12">O maior e mais completo pacote de arquivos STL para impressão 3D do Brasil.</p>
          
          <Button onClick={scrollToPricing} className="h-16 px-12 text-xl font-black uppercase bg-orange-500 hover:bg-orange-600 text-white shadow-xl shadow-orange-500/20 mb-16 rounded-full w-full max-w-md">
            BAIXAR PACOTE AGORA!
          </Button>

          <div className="space-y-6 text-sm text-slate-500 font-medium">
            <p className="text-orange-500">Email para suporte: suporte.megapackstl@gmail.com</p>
            <div className="flex items-center justify-center gap-4">
              <a href="#" className="hover:text-white transition-colors">Termos de Uso</a>
              <span>|</span>
              <a href="#" className="hover:text-white transition-colors">Política de Privacidade</a>
            </div>
            <p>© 2026 Mega Pack STL — Todos os direitos reservados.</p>
            <p className="max-w-2xl mx-auto text-xs opacity-60">
              Este site não é afiliado ao Facebook ou a qualquer entidade do Facebook. Depois que você sair do Facebook, a responsabilidade não é deles e sim do nosso site.
            </p>
          </div>
        </div>
      </footer>

      {/* BOTTOM-LEFT SOCIAL PROOF TOAST */}
      <AnimatePresence>
        {purchaseNotification && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-4 left-4 z-[100] max-w-[280px] bg-white text-slate-900 p-4 rounded-2xl shadow-2xl border border-slate-100 flex items-start gap-3"
          >
            <div className="bg-orange-100 p-2 rounded-full shrink-0">
              <ShoppingBag className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="font-bold text-sm leading-tight mb-1"><span className="text-orange-600">{purchaseNotification.name}</span> acabou de comprar!</p>
              <p className="text-xs text-slate-500 font-medium mb-1">Plano: PACOTE PREMIUM 2026</p>
              <p className="text-xs text-slate-400">{purchaseNotification.city} • Há poucos segundos</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* UPSELL DIALOG */}
      <Dialog open={showUpsell} onOpenChange={setShowUpsell}>
        <DialogContent className="sm:max-w-md bg-white text-slate-950 p-0 overflow-hidden border-0">
          <div className="bg-red-600 text-white text-center py-4 px-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIvPjwvc3ZnPg==')] opacity-50" />
            <DialogTitle className="text-2xl font-black uppercase relative z-10">OFERTA ESPECIAL!</DialogTitle>
          </div>
          <div className="p-6">
            <DialogDescription className="text-lg font-medium text-slate-700 mb-6 text-center">
              Por apenas <span className="font-black text-slate-950 text-xl">R$ 29,90</span>, você leva o PACOTE PREMIUM completo com mais de 90.000 STL e recebe TODOS os bônus exclusivos.
            </DialogDescription>
            
            <div className="bg-orange-50 border border-orange-100 rounded-xl p-4 mb-6">
              <ul className="space-y-3">
                <li className="flex items-center gap-2 font-bold text-sm"><Check className="w-5 h-5 text-orange-600 shrink-0" /> Coleção Heróis da Marvel Completa</li>
                <li className="flex items-center gap-2 font-bold text-sm"><Check className="w-5 h-5 text-orange-600 shrink-0" /> Pack de Veículos 3D Profissionais</li>
                <li className="flex items-center gap-2 font-bold text-sm"><Check className="w-5 h-5 text-orange-600 shrink-0" /> Utensílios Domésticos práticos</li>
                <li className="flex items-center gap-2 font-bold text-sm"><Check className="w-5 h-5 text-orange-600 shrink-0" /> Modelos Flexíveis & Articulados</li>
                <li className="flex items-center gap-2 font-black text-sm text-orange-600"><span className="text-lg">⚽</span> Módulo Especial Copa do Mundo</li>
              </ul>
            </div>

            <div className="flex flex-col gap-3">
              <Button onClick={() => handlePurchase("Oferta Especial Upgrade")} className="w-full h-14 text-lg font-black uppercase bg-emerald-500 hover:bg-emerald-600 text-white animate-pulse">
                Quero essa oferta premium
              </Button>
              <Button onClick={confirmBasicOnly} variant="ghost" className="w-full text-slate-500 hover:text-slate-700 hover:bg-slate-100 font-medium">
                Não, quero apenas a oferta de R$ 10,00 reais
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
