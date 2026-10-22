import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Shield, 
  Scale, 
  Gavel, 
  Briefcase, 
  ChevronRight, 
  CheckCircle2, 
  AlertCircle, 
  FileText, 
  MessageSquare, 
  Globe,
  ArrowRight,
  ChevronDown,
  Building2,
  Landmark,
  FileWarning
} from 'lucide-react';

// --- Types ---
type Language = 'ko' | 'en' | 'zh';

interface Content {
  hero: {
    title: string;
    subtitle: string;
    cta: string;
    specialties: string[];
  };
  empathy: {
    title: string;
    points: string[];
  };
  flagship: {
    tag: string;
    title: string;
    story: string[];
    result: string;
  };
  cases: {
    title: string;
    items: {
      title: string;
      desc: string;
      result: string;
    }[];
  };
  authority: {
    title: string;
    points: {
      title: string;
      desc: string;
    }[];
  };
  filter: {
    title: string;
    subtitle: string;
    requirements: string[];
  };
  closing: {
    text: string;
    author: string;
  };
  cta: {
    title: string;
    form: {
      summary: string;
      situation: string;
      docs: string;
      submit: string;
    };
  };
}

const translations: Record<Language, Content> = {
  ko: {
    hero: {
      title: "20년 동안 해결되지 않은 사건,\n우리는 5개월 만에 해결했습니다.",
      subtitle: "다른 변호사들이 해결하지 못한 사건을 위한 최후의 해결사.",
      cta: "사건 검토 요청하기",
      specialties: ["토지 분쟁", "기업 분쟁", "정부 조사 대응", "세무 문제", "장기 미결 사건"]
    },
    empathy: {
      title: "당신이 겪고 있는 고통을 이해합니다.",
      points: [
        "수년간의 법적 다툼으로 몸과 마음이 지쳐버린 상태",
        "기존 변호사들의 무능함과 무책임에 대한 깊은 불신",
        "정부 기관이나 파트너의 압박으로 인한 극심한 스트레스",
        "자산, 토지, 혹은 기업 전체를 잃을지도 모른다는 공포"
      ]
    },
    flagship: {
      tag: "대표 성공 사례",
      title: "연 매출 1조 원 기업의 베트남 퇴출 위기를 막아내다",
      story: [
        "연 매출 1조 원이 넘는 대기업이 내부 문제와 정부의 압박으로 베트남 공장 폐쇄 위기에 처했습니다. 정부 기관은 매일같이 압박을 가했고, 공장 가동 중단은 시간 문제였습니다.",
        "CEO는 수면제 없이는 잠을 이룰 수 없는 극도의 스트레스 속에 있었고, 이미 여러 경로로 해결을 시도했으나 모두 실패한 상태였습니다. 결국 우리 팀이 '마지막 희망'으로 투입되었습니다.",
        "우리는 즉각적인 협상 대신 사건의 본질을 파고들었습니다. 내부 정보 유출, 과거 협상 과정, 그리고 기업이 차마 밝히지 못했던 숨겨진 문제들까지 하나하나 조사했습니다.",
        "정부의 압박이 최고조에 달했을 때, 우리는 정부 기관의 '절차적 오류'를 발견했습니다. 100여 명의 공무원이 50인승 버스 두 대에 나눠 타고 압박해 오던 결정적인 순간, 우리는 그 오류를 바탕으로 전략적 협상을 이끌어냈습니다."
      ],
      result: "결과: 공장은 폐쇄되지 않았고, 기업은 베트남에서 성공적으로 사업을 지속하고 있습니다."
    },
    cases: {
      title: "불가능을 가능으로 바꾼 기록들",
      items: [
        {
          title: "20년 토지 분쟁의 종결",
          desc: "5명의 변호사를 거치며 20년간 해결되지 않던 토지 분쟁 사건",
          result: "5개월 만에 완전 해결"
        },
        {
          title: "7년 숙원, 핑크북 발급",
          desc: "공장 부지 레드북(핑크북)을 7년간 받지 못해 발만 동동 구르던 사례",
          result: "2개월 만에 발급 완료"
        },
        {
          title: "아파트 개발사 상대 승소",
          desc: "레드북 발급을 거부하는 대형 개발사를 상대로 한 소송",
          result: "승소 및 전액 보상 판결"
        }
      ]
    },
    authority: {
      title: "왜 우리여야만 하는가",
      points: [
        { title: "20년 이상의 분쟁 해결 노하우", desc: "베트남 법조계와 행정 절차에 대한 깊은 통찰력" },
        { title: "정부 기관 상대 협상 전문가", desc: "복잡한 행정 조사 및 규제 문제 해결의 독보적 실적" },
        { title: "난해한 사건 전문", desc: "다른 곳에서 포기한 사건일수록 우리의 가치는 빛납니다" }
      ]
    },
    filter: {
      title: "우리는 모든 사건을 맡지 않습니다.",
      subtitle: "우리는 오직 승리가 절실하고 가치가 높은 사건에만 집중합니다.",
      requirements: [
        "수년간 해결되지 않은 장기 미결 사건",
        "이미 다른 변호사를 고용했으나 실패한 사건",
        "경제적 이해관계가 매우 큰 고액 자산/기업 사건",
        "토지, 기업, 세무 등 정부 기관과 얽힌 복잡한 문제"
      ]
    },
    closing: {
      text: "어떤 사건들은 처음에는 단순한 문제로 시작됩니다. 하지만 시간이 흐르고, 실수가 반복되고, 실패한 시도들이 쌓이면서 걷잡을 수 없이 복잡해집니다. 그제야 사람들은 우리를 찾아옵니다.",
      author: "VNK HANOI - Linda Kang Law Office"
    },
    cta: {
      title: "사건 검토 요청",
      form: {
        summary: "사건 요약",
        situation: "현재 상황",
        docs: "관련 서류 (업로드)",
        submit: "검토 요청하기"
      }
    }
  },
  en: {
    hero: {
      title: "Cases Unresolved for 20 Years,\nWe Solved in 5 Months.",
      subtitle: "The last problem-solver for cases other lawyers could not resolve.",
      cta: "Request Case Review",
      specialties: ["Land Disputes", "Corporate Disputes", "Government Investigations", "Tax Issues", "Long Unresolved Cases"]
    },
    empathy: {
      title: "We understand your exhaustion.",
      points: [
        "Exhausted from years of legal battles that lead nowhere",
        "Deep distrust in the incompetence of previous legal counsel",
        "Severe stress from government pressure or hostile partners",
        "Fear of losing assets, land, or your entire company"
      ]
    },
    flagship: {
      tag: "Flagship Success Story",
      title: "Saving a $1B Revenue Company from Total Shutdown",
      story: [
        "A major corporation with over $1B in annual revenue faced a total factory shutdown in Vietnam due to internal leaks and government pressure. Authorities applied daily pressure, threatening immediate closure.",
        "The CEO was under such extreme stress that sleep was impossible without medication. Every previous attempt to resolve the issue had failed. Our firm was brought in as the absolute 'last option'.",
        "Instead of immediate negotiation, we dug into the core. We investigated internal leaks, past negotiation failures, and hidden issues the company hadn't disclosed initially.",
        "As pressure peaked, we discovered a critical 'procedural mistake' by the authorities. During a confrontation with 100+ officials arriving in two buses, we used this discovery to turn the tide of negotiation."
      ],
      result: "Result: The factory remained open. The company survived and continues to thrive in Vietnam."
    },
    cases: {
      title: "Records of Turning Impossible to Possible",
      items: [
        {
          title: "20-Year Land Dispute",
          desc: "Unresolved for two decades through five different lawyers",
          result: "Fully resolved in 5 months"
        },
        {
          title: "7-Year Red Book Delay",
          desc: "Factory land title (Red Book) stuck for 7 years",
          result: "Issued in 2 months"
        },
        {
          title: "Litigation vs Developer",
          desc: "Lawsuit against a major developer refusing to issue titles",
          result: "Won with full compensation"
        }
      ]
    },
    authority: {
      title: "Why We Are the Final Choice",
      points: [
        { title: "20+ Years of Resolution", desc: "Deep insight into Vietnamese legal and administrative systems" },
        { title: "Government Negotiation Experts", desc: "Unrivaled track record in handling complex regulatory issues" },
        { title: "Specialization in Complexity", desc: "The more difficult the case, the more our expertise shines" }
      ]
    },
    filter: {
      title: "We Do Not Accept Every Case.",
      subtitle: "We focus exclusively on high-value cases where victory is paramount.",
      requirements: [
        "Long-term unresolved disputes lasting years",
        "Cases already failed by other legal counsel",
        "High-stakes financial interests (Corporate/Private)",
        "Complex matters involving Land, Tax, or Government agencies"
      ]
    },
    closing: {
      text: "Some cases begin as simple problems. But after years of delays, mistakes, and failed attempts, they become extremely complex. When that happens, people come to us.",
      author: "VNK HANOI - Linda Kang Law Office"
    },
    cta: {
      title: "Request Case Review",
      form: {
        summary: "Case Summary",
        situation: "Current Situation",
        docs: "Relevant Documents",
        submit: "Submit for Review"
      }
    }
  },
  zh: {
    hero: {
      title: "20年未决案件，\n我们在5个月内圆满解决。",
      subtitle: "专为其他律师无法解决的疑难案件提供最终方案。",
      cta: "请求案件评估",
      specialties: ["土地纠纷", "企业纠纷", "政府调查应对", "税务问题", "长期未决案件"]
    },
    empathy: {
      title: "我们深知您的疲惫与焦虑。",
      points: [
        "多年法律诉讼无果，身心俱疲",
        "对前任律师的无能与不负责任深感失望",
        "面对政府部门或合作伙伴的压力，承受巨大压力",
        "担心失去资产、土地或整个企业的恐惧"
      ]
    },
    flagship: {
      tag: "旗舰成功案例",
      title: "挽救年营收万亿韩元企业免于被驱逐的危机",
      story: [
        "一家年营收超过1万亿韩元的大型企业因内部问题和政府压力，面临越南工厂关停的危机。政府机构每日施压，停产迫在眉睫。",
        "CEO承受着极大的压力，不靠安眠药无法入睡。此前尝试过多种途径解决均告失败。最终，我们团队作为“最后的希望”介入。",
        "我们没有立即进行谈判，而是深入挖掘案件本质。调查了内部信息泄露、过去的谈判过程，以及企业最初未敢透露的隐藏问题。",
        "在政府压力达到顶峰、百余名官员分乘两辆大巴前来施压的关键时刻，我们发现了政府机构的“程序性错误”，并以此为基础达成的战略性谈判。"
      ],
      result: "结果：工厂未被关停，企业在越南成功继续运营。"
    },
    cases: {
      title: "化不可能为可能的记录",
      items: [
        {
          title: "20年土地纠纷终结",
          desc: "历经5任律师、20年未决的土地纠纷案",
          result: "5个月内彻底解决"
        },
        {
          title: "7年夙愿，红皮书发放",
          desc: "工厂用地红皮书拖延7年无法办理",
          result: "2个月内办理完成"
        },
        {
          title: "起诉公寓开发商胜诉",
          desc: "针对拒绝发放红皮书的大型开发商提起诉讼",
          result: "胜诉并获得全额赔偿"
        }
      ]
    },
    authority: {
      title: "为什么选择我们",
      points: [
        { title: "20年以上纠纷解决经验", desc: "对越南法律界和行政程序有深刻洞察" },
        { title: "政府机构谈判专家", desc: "在处理复杂行政调查和监管问题方面业绩卓越" },
        { title: "疑难案件专家", desc: "越是别人放弃的案件，越能体现我们的价值" }
      ]
    },
    filter: {
      title: "我们不接受所有案件。",
      subtitle: "我们只专注于那些迫切需要胜利且价值重大的案件。",
      requirements: [
        "多年未决的长期疑难案件",
        "已聘请其他律师但以失败告终的案件",
        "涉及重大利益的高额资产/企业案件",
        "与土地、企业、税务等政府机构相关的复杂问题"
      ]
    },
    closing: {
      text: "有些案件起初只是简单的问题。但随着时间推移、错误重复以及失败尝试的累积，它们变得极其复杂。就在那时，人们找到了我们。",
      author: "VNK HANOI - Linda Kang Law Office"
    },
    cta: {
      title: "请求案件评估",
      form: {
        summary: "案件摘要",
        situation: "当前状况",
        docs: "相关文件",
        submit: "提交评估"
      }
    }
  }
};

export default function App() {
  const [lang, setLang] = useState<Language>('ko');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const content = translations[lang];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen font-sans selection:bg-accent-600 selection:text-white">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'glass py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-4 group">
            <div className="relative flex items-center justify-center w-14 h-14">
              {/* Gold Glow Effect */}
              <div className="absolute inset-0 bg-accent-500/10 blur-xl rounded-full group-hover:bg-accent-500/20 transition-all" />
              <div className="relative flex items-center justify-center w-12 h-12 rounded-full border-2 border-accent-600/30 bg-gradient-to-b from-accent-400/10 to-accent-900/20 shadow-[0_0_15px_rgba(212,175,55,0.1)]">
                <Scale className="w-7 h-7 text-accent-500 drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-display text-2xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-accent-200 via-accent-500 to-accent-700 leading-none">
                VNK HANOI
              </span>
              <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-accent-600/40 to-transparent my-1" />
              <span className="text-[10px] uppercase tracking-[0.2em] text-accent-200/40 font-medium">
                Linda Kang Law Office
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-8">
            {/* Desktop Language Menu */}
            <div className="hidden md:flex items-center gap-4 text-xs font-medium uppercase tracking-widest text-white/60">
              {(['ko', 'en', 'zh'] as Language[]).map((l) => (
                <button 
                  key={l}
                  onClick={() => setLang(l)}
                  className={`hover:text-accent-600 transition-colors ${lang === l ? 'text-accent-600' : ''}`}
                >
                  {l === 'ko' ? '한국어' : l === 'en' ? 'English' : '中文'}
                </button>
              ))}
            </div>

            {/* Mobile Language Toggle */}
            <div className="relative md:hidden">
              <button 
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white/80 hover:bg-white/10 transition-all"
              >
                <Globe className="w-4 h-4 text-accent-500" />
                <span className="text-[10px] uppercase tracking-widest font-bold">
                  {lang === 'ko' ? '한국어' : lang === 'en' ? 'EN' : '中文'}
                </span>
                <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${isLangMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {isLangMenuOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-32 glass border border-white/10 rounded-xl overflow-hidden z-50 shadow-2xl"
                  >
                    {(['ko', 'en', 'zh'] as Language[]).map((l) => (
                      <button 
                        key={l}
                        onClick={() => {
                          setLang(l);
                          setIsLangMenuOpen(false);
                        }}
                        className={`w-full px-4 py-3 text-left text-[10px] uppercase tracking-widest font-bold transition-colors hover:bg-white/5 ${lang === l ? 'text-accent-500 bg-white/5' : 'text-white/60'}`}
                      >
                        {l === 'ko' ? '한국어' : l === 'en' ? 'English' : '中文'}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button className="hidden md:block px-6 py-2 bg-accent-600 text-white font-bold text-sm rounded-full hover:bg-accent-500 transition-all">
              {content.hero.cta}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-40 pb-20">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=2000" 
            alt="Legal Background" 
            className="w-full h-full object-cover opacity-30 grayscale"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-display text-4xl md:text-7xl lg:text-8xl font-bold mb-8 text-balance leading-[1.15]">
              {content.hero.title.split('\n').map((line, i) => (
                <span key={i} className={i === 1 ? 'accent-gradient block mt-2' : 'block'}>
                  {line}
                </span>
              ))}
            </h1>
            <p className="text-lg md:text-2xl text-white/60 mb-12 max-w-3xl mx-auto font-light tracking-wide px-4">
              {content.hero.subtitle}
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-16">
              {content.hero.specialties.map((s, i) => (
                <span key={i} className="px-4 py-1 rounded-full border border-white/10 bg-white/5 text-xs font-medium tracking-widest uppercase text-white/40">
                  {s}
                </span>
              ))}
            </div>

            <button className="group relative px-12 py-5 bg-accent-600 text-white font-black text-lg rounded-full overflow-hidden hover:scale-105 transition-transform">
              <span className="relative z-10 flex items-center gap-2">
                {content.hero.cta} <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </motion.div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/20">
          <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
          <ChevronDown className="w-4 h-4 animate-scroll" />
        </div>
      </section>

      {/* Empathy Section */}
      <section className="py-32 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="font-display text-4xl md:text-6xl font-bold mb-12 leading-tight">
                {content.empathy.title}
              </h2>
              <div className="space-y-8">
                {content.empathy.points.map((p, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-4 items-start"
                  >
                    <div className="mt-1 p-1 rounded-full bg-accent-600/10 border border-accent-600/20">
                      <AlertCircle className="w-5 h-5 text-accent-600" />
                    </div>
                    <p className="text-lg text-white/70 font-light leading-relaxed">{p}</p>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden accent-border">
                <img 
                  src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=1000" 
                  alt="Professional Consultant" 
                  className="w-full h-full object-cover grayscale opacity-60"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-10 -left-10 glass p-8 rounded-xl max-w-xs">
                <p className="text-accent-600 font-display italic text-xl mb-2">"The last option is often the only one that works."</p>
                <p className="text-white/40 text-xs uppercase tracking-widest">— VinaLegal Strategy</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Flagship Case Story - Cinematic */}
      <section className="py-32 bg-[#0a0a0a] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-600 rounded-full blur-[150px]"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-600 rounded-full blur-[150px]"></div>
        </div>

        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <span className="text-accent-600 text-sm font-bold uppercase tracking-[0.4em] mb-4 block">
              {content.flagship.tag}
            </span>
            <h2 className="font-display text-4xl md:text-6xl font-bold leading-tight">
              {content.flagship.title}
            </h2>
          </div>

          <div className="space-y-16">
            {content.flagship.story.map((para, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className={`flex gap-10 items-start ${i % 2 === 1 ? 'flex-row-reverse' : ''}`}
              >
                <div className="hidden md:block text-6xl font-display text-white/5 font-black shrink-0">
                  0{i + 1}
                </div>
                <div className="glass p-10 rounded-3xl relative">
                  <p className="text-xl text-white/80 leading-relaxed font-light italic">
                    {para}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            className="mt-20 p-12 rounded-3xl bg-accent-600 text-white text-center"
          >
            <h3 className="text-3xl font-black uppercase tracking-tight mb-2">
              {content.flagship.result}
            </h3>
          </motion.div>
        </div>
      </section>

      {/* Additional Case Studies */}
      <section className="py-32 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-center mb-20">
            {content.cases.title}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {content.cases.items.map((item, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="glass p-10 rounded-2xl flex flex-col justify-between h-full"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-accent-600/10 flex items-center justify-center mb-8">
                    {i === 0 ? <Landmark className="text-accent-600" /> : i === 1 ? <FileText className="text-accent-600" /> : <Gavel className="text-accent-600" />}
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                  <p className="text-white/50 font-light mb-8">{item.desc}</p>
                </div>
                <div className="pt-6 border-t border-white/10">
                  <span className="text-accent-600 font-bold uppercase tracking-widest text-sm">
                    {item.result}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Authority Section */}
      <section className="py-32 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div className="order-2 md:order-1">
              <div className="grid grid-cols-2 gap-4">
                <div className="aspect-square rounded-2xl overflow-hidden accent-border">
                  <img src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=500" alt="Legal" className="w-full h-full object-cover grayscale" referrerPolicy="no-referrer" />
                </div>
                <div className="aspect-square rounded-2xl overflow-hidden mt-12 accent-border">
                  <img src="https://images.unsplash.com/photo-1521791136064-7986c2923216?auto=format&fit=crop&q=80&w=500" alt="Meeting" className="w-full h-full object-cover grayscale" referrerPolicy="no-referrer" />
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <h2 className="font-display text-4xl md:text-6xl font-bold mb-12">
                {content.authority.title}
              </h2>
              <div className="space-y-12">
                {content.authority.points.map((p, i) => (
                  <div key={i} className="group">
                    <h3 className="text-xl font-bold text-accent-600 mb-2 flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5" /> {p.title}
                    </h3>
                    <p className="text-white/60 font-light text-lg leading-relaxed group-hover:text-white transition-colors">
                      {p.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Qualification Filter */}
      <section className="py-32 bg-black">
        <div className="max-w-4xl mx-auto px-6">
          <div className="glass p-16 rounded-[40px] text-center border-accent-600/20">
            <div className="inline-flex p-4 rounded-full bg-red-500/10 mb-8">
              <FileWarning className="w-8 h-8 text-red-500" />
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
              {content.filter.title}
            </h2>
            <p className="text-white/50 text-xl mb-12 font-light">
              {content.filter.subtitle}
            </p>
            <div className="grid md:grid-cols-2 gap-4 text-left">
              {content.filter.requirements.map((r, i) => (
                <div key={i} className="flex gap-3 items-center p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="w-2 h-2 rounded-full bg-accent-600"></div>
                  <span className="text-sm font-medium text-white/80">{r}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Closing Message */}
      <section className="py-40 bg-[#050505] text-center">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
          >
            <p className="font-display text-3xl md:text-5xl italic leading-relaxed text-white/90 mb-12">
              "{content.closing.text}"
            </p>
            <div className="w-20 h-[1px] bg-accent-600 mx-auto mb-8"></div>
            <p className="text-accent-600 font-bold uppercase tracking-[0.5em] text-sm">
              {content.closing.author}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Final CTA Form */}
      <section id="contact" className="py-32 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-20">
            <div>
              <h2 className="font-display text-5xl md:text-7xl font-bold mb-8 leading-tight">
                {content.cta.title}
              </h2>
              <p className="text-xl text-white/50 font-light mb-12">
                We only accept cases that meet our criteria for complexity and value.
              </p>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full glass flex items-center justify-center">
                    <Globe className="w-5 h-5 text-accent-600" />
                  </div>
                  <div>
                    <p className="text-xs text-white/40 uppercase tracking-widest">Global HQ</p>
                    <p className="font-medium">Ho Chi Minh City, Vietnam</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full glass flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-accent-600" />
                  </div>
                  <div>
                    <p className="text-xs text-white/40 uppercase tracking-widest">Direct Line</p>
                    <p className="font-medium">+84 (0) 28 XXXX XXXX</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="glass p-12 rounded-3xl">
              <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-white/40 mb-3">
                    {content.cta.form.summary}
                  </label>
                  <input 
                    type="text" 
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:outline-none focus:border-accent-600 transition-colors"
                    placeholder="..."
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-white/40 mb-3">
                    {content.cta.form.situation}
                  </label>
                  <textarea 
                    rows={4}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:outline-none focus:border-accent-600 transition-colors"
                    placeholder="..."
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-white/40 mb-3">
                    {content.cta.form.docs}
                  </label>
                  <div className="w-full border-2 border-dashed border-white/10 rounded-xl p-8 text-center hover:border-accent-600/50 transition-colors cursor-pointer">
                    <FileText className="w-8 h-8 text-white/20 mx-auto mb-4" />
                    <p className="text-sm text-white/40">Drop files here or click to upload</p>
                  </div>
                </div>
                <button className="w-full py-5 bg-accent-600 text-white font-black text-lg rounded-xl hover:bg-accent-500 transition-all">
                  {content.cta.form.submit}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-black border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:row justify-between items-center gap-8">
          <div className="flex items-center gap-4 opacity-70 grayscale hover:grayscale-0 transition-all">
            <Scale className="w-8 h-8 text-accent-500" />
            <div className="flex flex-col">
              <span className="font-display text-lg font-bold text-transparent bg-clip-text bg-gradient-to-b from-accent-200 to-accent-600">VNK HANOI</span>
              <span className="text-[8px] uppercase tracking-widest text-accent-500/40">Linda Kang Law Office</span>
            </div>
          </div>
          <p className="text-white/20 text-xs tracking-widest uppercase">
            © 2026 VNK HANOI. All Rights Reserved.
          </p>
          <div className="flex gap-6 text-white/40 text-xs uppercase tracking-widest">
            <a href="#" className="hover:text-accent-600 transition-colors">Privacy</a>
            <a href="#" className="hover:text-accent-600 transition-colors">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
