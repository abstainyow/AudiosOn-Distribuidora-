
import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import ReleaseCard from './components/ReleaseCard';
import AdInterstitial from './components/AdInterstitial';
import { getMarketInsights } from './services/geminiService';
import { Release } from './types';
import { 
  Plus, Disc, Sparkles, Shield, LayoutDashboard, Globe, ArrowUpRight, 
  DollarSign, PieChart, TrendingUp, UserCheck, ShieldCheck, 
  Calendar, Zap, Award, Users, Search, Play, CreditCard,
  MessageSquare, Lightbulb, ChevronRight, Info, Loader2, CheckCircle
} from 'lucide-react';

const BACKSTAGE_INSTAGRAM = "https://www.instagram.com/backstage_concept.ao?igsh=MXNkcWZodDlwcHVueQ==";

const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState('dashboard');
  const [releases, setReleases] = useState<Release[]>([]);
  const [selectedRelease, setSelectedRelease] = useState<Release | null>(null);
  const [showAd, setShowAd] = useState(false);
  const [aiInsights, setAiInsights] = useState<{text: string, loading: boolean}>({ text: '', loading: false });

  useEffect(() => {
    setShowAd(true);
    const mockReleases: Release[] = [
      {
        id: 'feat-1',
        title: 'Futuro da Batida',
        artist: 'Dax Vibe',
        releaseDate: '2026-01-20',
        genre: 'Afro-Futurism',
        isrc: 'AO-ON-26-00001',
        status: 'Publicado',
        coverUrl: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&q=80&w=800', 
        links: { smartLink: 'https://audios.on/daxvibe/futuro' },
        copyrightInfo: 'Copyright © 2026 Audios On.',
        stats: { streams: 250400, saves: 12200, shares: 8540 }
      }
    ];
    setReleases(mockReleases);
  }, []);

  const fetchInsights = async () => {
    setAiInsights({ text: '', loading: true });
    try {
      const data = await getMarketInsights("Afrobeat/Kuduro");
      setAiInsights({ text: data.text || 'Sem dados.', loading: false });
    } catch (e) {
      setAiInsights({ text: 'Erro ao conectar com o futuro musical. Tente novamente.', loading: false });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f0f2f5]">
      {showAd && <AdInterstitial onClose={() => setShowAd(false)} />}
      <Header currentTab={currentTab} setTab={setCurrentTab} />

      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10">
        
        {/* DASHBOARD TAB */}
        {currentTab === 'dashboard' && (
          <div className="space-y-10 animate-in fade-in duration-700">
            {/* 2026 HERO */}
            <div className="relative h-[400px] rounded-[48px] overflow-hidden shadow-2xl bg-indigo-900">
               <img src="https://images.unsplash.com/photo-1514525253361-bee8a19740c1?auto=format&fit=crop&q=80&w=1600" className="absolute inset-0 w-full h-full object-cover opacity-60" />
               <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
               <div className="absolute bottom-12 left-12">
                  <span className="bg-indigo-500 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-[0.2em] mb-4 inline-block">Membro Pro 2026</span>
                  <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-4">Bem-vindo à <span className="text-indigo-400">Nova Era</span>.</h1>
                  <p className="text-white/70 max-w-xl font-medium">Sua carreira está em alta. O mercado de 2026 favorece sua sonoridade atual.</p>
               </div>
            </div>

            {/* KEY STATS */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
               {[
                 { label: 'Ganhos Acumulados', value: '4.250,00 €', icon: DollarSign, color: 'text-green-600', bg: 'bg-green-100' },
                 { label: 'Total Streams', value: '1.2M', icon: Play, color: 'text-indigo-600', bg: 'bg-indigo-100' },
                 { label: 'Países Ativos', value: '142', icon: Globe, color: 'text-purple-600', bg: 'bg-purple-100' },
                 { label: 'Seguidores Novos', value: '+12%', icon: Users, color: 'text-pink-600', bg: 'bg-pink-100' },
               ].map((stat, i) => (
                 <div key={i} className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm flex items-center gap-5">
                    <div className={`${stat.bg} p-4 rounded-2xl`}>
                      <stat.icon className={`${stat.color} w-6 h-6`} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{stat.label}</p>
                      <p className="text-2xl font-black text-gray-900">{stat.value}</p>
                    </div>
                 </div>
               ))}
            </div>

            {/* AI INSIGHTS BAR */}
            <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Sparkles className="w-32 h-32 text-indigo-600" />
               </div>
               <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
                  <div className="bg-indigo-600 p-6 rounded-[32px] text-white">
                     <Lightbulb className="w-10 h-10" />
                  </div>
                  <div className="flex-grow">
                     <h3 className="text-2xl font-black tracking-tight mb-2">Manager AI: Tendências de 2026</h3>
                     <p className="text-gray-500 font-medium mb-4">Clique para analisar as melhores oportunidades para o seu gênero musical hoje.</p>
                     {aiInsights.text && (
                        <div className="bg-indigo-50/50 p-6 rounded-2xl text-indigo-900 font-medium text-sm leading-relaxed mb-4 border border-indigo-100 animate-in slide-in-from-top-2">
                           {aiInsights.text}
                        </div>
                     )}
                     <button 
                       onClick={fetchInsights}
                       disabled={aiInsights.loading}
                       className="bg-gray-900 text-white px-8 py-3 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-indigo-600 transition-all flex items-center gap-3 disabled:opacity-50"
                     >
                       {/* Fix: use the imported Loader2 icon */}
                       {aiInsights.loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
                       {aiInsights.loading ? 'Analisando Mercado...' : 'Obter Insights 2026'}
                     </button>
                  </div>
               </div>
            </div>

            {/* CATALOGUE MINI */}
            <div className="bg-white rounded-[40px] p-10 border border-gray-100">
               <div className="flex justify-between items-center mb-10">
                  <h3 className="text-2xl font-black tracking-tight">Catálogo Recente</h3>
                  <button onClick={() => setCurrentTab('new')} className="text-indigo-600 font-black text-sm flex items-center gap-2 hover:gap-4 transition-all">Ver Todos <ChevronRight className="w-4 h-4" /></button>
               </div>
               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                  {releases.map(r => <ReleaseCard key={r.id} release={r} onSelect={setSelectedRelease} />)}
               </div>
            </div>
          </div>
        )}

        {/* FINANCIAL TAB */}
        {currentTab === 'financials' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-end">
               <div>
                  <h2 className="text-4xl font-black tracking-tight mb-2">Seu Dinheiro</h2>
                  <p className="text-gray-400 font-medium">Transparência total nos seus Royalties de 2026.</p>
               </div>
               <button className="bg-green-600 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-3 hover:bg-green-700 transition-all shadow-lg shadow-green-100">
                  <ArrowUpRight className="w-4 h-4" /> Solicitar Levantamento
               </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               <div className="col-span-2 bg-white rounded-[40px] p-10 border border-gray-100">
                  <div className="flex items-center justify-between mb-10">
                     <h4 className="font-black text-lg">Histórico de Recebimentos</h4>
                     <select className="bg-gray-50 border-none rounded-xl px-4 py-2 text-xs font-bold text-gray-500 outline-none">
                        <option>Últimos 6 meses</option>
                        <option>Ano 2026</option>
                     </select>
                  </div>
                  <div className="h-64 flex items-end gap-3 px-4">
                     {[40, 70, 45, 90, 65, 85].map((h, i) => (
                        <div key={i} className="flex-grow group relative">
                           <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] font-black px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">€{(h*10).toFixed(2)}</div>
                           <div style={{height: `${h}%`}} className="bg-indigo-600 rounded-t-xl w-full group-hover:bg-indigo-400 transition-colors"></div>
                        </div>
                     ))}
                  </div>
                  <div className="flex justify-between mt-6 px-2 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                     <span>Jan</span><span>Fev</span><span>Mar</span><span>Abr</span><span>Mai</span><span>Jun</span>
                  </div>
               </div>

               <div className="bg-indigo-600 rounded-[40px] p-10 text-white relative overflow-hidden">
                  <PieChart className="absolute -bottom-10 -right-10 w-48 h-48 opacity-10" />
                  <h4 className="font-black text-lg mb-8">Por Plataforma</h4>
                  <div className="space-y-6">
                     {[
                       { name: 'Spotify', perc: 45, val: '€1.912' },
                       { name: 'Apple Music', perc: 25, val: '€1.062' },
                       { name: 'YouTube Music', perc: 20, val: '€850' },
                       { name: 'Outros', perc: 10, val: '€425' },
                     ].map((plat, i) => (
                       <div key={i} className="space-y-2">
                          <div className="flex justify-between text-xs font-bold">
                             <span>{plat.name}</span>
                             <span>{plat.val}</span>
                          </div>
                          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                             <div style={{width: `${plat.perc}%`}} className="h-full bg-white rounded-full"></div>
                          </div>
                       </div>
                     ))}
                  </div>
               </div>
            </div>
          </div>
        )}

        {/* CAREER TAB */}
        {currentTab === 'career' && (
          <div className="space-y-10 animate-in fade-in duration-500">
             <div className="max-w-3xl">
                <h2 className="text-4xl font-black tracking-tight mb-4">Hub de Carreira <span className="text-indigo-600">BKS</span></h2>
                <p className="text-gray-500 text-lg">Conexão direta com a Backstage Concept Luanda e oportunidades globais exclusivas de 2026.</p>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-10 rounded-[40px] border border-gray-100 hover:border-indigo-200 transition-all cursor-pointer group">
                   <div className="flex items-start justify-between mb-6">
                      <div className="bg-orange-100 p-4 rounded-2xl text-orange-600"><Award className="w-8 h-8" /></div>
                      <span className="bg-orange-100 text-orange-700 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">Aberto</span>
                   </div>
                   <h4 className="text-2xl font-black mb-2 group-hover:text-indigo-600 transition-colors">Showcase Luanda 2026</h4>
                   <p className="text-gray-500 text-sm mb-6">Inscrições abertas para o festival de novos talentos da Backstage Concept. Garanta sua vaga no palco principal.</p>
                   <button className="flex items-center gap-2 text-indigo-600 font-black text-xs uppercase tracking-widest">Saber Mais <ArrowUpRight className="w-4 h-4" /></button>
                </div>

                <div className="bg-white p-10 rounded-[40px] border border-gray-100 hover:border-indigo-200 transition-all cursor-pointer group">
                   <div className="flex items-start justify-between mb-6">
                      <div className="bg-blue-100 p-4 rounded-2xl text-blue-600"><Users className="w-8 h-8" /></div>
                      <span className="bg-blue-100 text-blue-700 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">Em Breve</span>
                   </div>
                   <h4 className="text-2xl font-black mb-2 group-hover:text-indigo-600 transition-colors">Agenciamento 360º</h4>
                   <p className="text-gray-500 text-sm mb-6">Nova rodada de contratos de gestão de carreira para artistas da Audios On. Prepare seu EPK.</p>
                   <button className="flex items-center gap-2 text-gray-400 font-black text-xs uppercase tracking-widest cursor-not-allowed">Aguardando Abertura</button>
                </div>
             </div>
          </div>
        )}

        {/* COPYRIGHT TAB */}
        {currentTab === 'copyright' && (
          <div className="space-y-8 animate-in fade-in duration-500">
             <div className="bg-gray-900 rounded-[48px] p-12 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 p-12 opacity-10">
                   <ShieldCheck className="w-64 h-64" />
                </div>
                <div className="relative z-10 max-w-2xl">
                   <h2 className="text-4xl font-black mb-6">Sua Música é <span className="text-indigo-500">Intocável</span>.</h2>
                   <p className="text-gray-400 text-lg mb-10 leading-relaxed">Em 2026, usamos tecnologia de fingerprinting avançada para proteger cada segundo do seu master contra treinamento não autorizado de IAs piratas.</p>
                   
                   <div className="grid grid-cols-2 gap-8">
                      <div className="space-y-2">
                         <div className="flex items-center gap-3 text-indigo-400 font-black uppercase text-xs tracking-widest">
                            {/* Fix: use the imported CheckCircle icon */}
                            <CheckCircle className="w-4 h-4" /> Registro ISRC Global
                         </div>
                         <p className="text-[10px] text-gray-500">Atribuímos códigos ISRC válidos em 180 países automaticamente.</p>
                      </div>
                      <div className="space-y-2">
                         <div className="flex items-center gap-3 text-indigo-400 font-black uppercase text-xs tracking-widest">
                            {/* Fix: use the imported CheckCircle icon */}
                            <CheckCircle className="w-4 h-4" /> Proteção Social Media
                         </div>
                         <p className="text-[10px] text-gray-500">Monetize cada vez que sua música for tocada no Facebook ou TikTok.</p>
                      </div>
                   </div>
                </div>
             </div>
             
             <div className="bg-white rounded-[40px] p-10 border border-gray-100 flex flex-col md:flex-row items-center gap-10">
                <div className="bg-red-50 p-6 rounded-[32px] text-red-600">
                   <Shield className="w-12 h-12" />
                </div>
                <div className="flex-grow">
                   <h4 className="text-xl font-black mb-2">Denunciar Uso Indevido</h4>
                   <p className="text-gray-500 text-sm font-medium">Viu sua música sendo usada sem créditos ou em canais não autorizados? Nossa equipe jurídica de 2026 resolve para você.</p>
                </div>
                <button className="bg-gray-100 hover:bg-red-600 hover:text-white text-gray-900 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all">Abrir Ticket Jurídico</button>
             </div>
          </div>
        )}

      </main>

      <footer className="bg-white border-t border-gray-100 py-20 mt-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
           <div className="flex justify-center gap-10 mb-12 opacity-20">
              <img src="https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg" className="h-8 w-8 grayscale" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" className="h-8 w-8 grayscale" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" className="h-8 w-16 grayscale" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/TikTok_logo.svg" className="h-8 w-20 grayscale" />
           </div>
           <p className="text-[11px] text-gray-400 font-black tracking-[0.5em] uppercase mb-4">
             Audios On Music Group &copy; 2026
           </p>
           <div className="flex justify-center gap-6 text-[9px] font-black text-gray-300 uppercase tracking-widest">
              <a href="#" className="hover:text-indigo-600">Termos de Uso</a>
              <a href="#" className="hover:text-indigo-600">Privacidade 2026</a>
              <a href={BACKSTAGE_INSTAGRAM} target="_blank" className="hover:text-indigo-600">Backstage Concept Luanda</a>
           </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
