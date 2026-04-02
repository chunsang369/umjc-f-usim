'use client';

import { motion } from 'framer-motion';

export default function HeroSection() {
  return (
    <section className="relative w-full h-screen min-h-[100dvh] overflow-hidden bg-neutral-900 flex items-center justify-center">
      {/* 
        동영상 배경 (워터마크 스케일-아웃 크롭 기법 적용) 
        scale-[1.15] (115% 확대) 와 translate 위치 조정을 통해 오른쪽 하단을 화면 밖으로 밀어냅니다.
      */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <video 
          className="absolute top-0 left-0 w-full h-full object-cover scale-[1.15] translate-y-[5%] translate-x-[5%]"
          autoPlay 
          muted 
          loop 
          playsInline
        >
          <source src="/videos/hero-bg.mp4" type="video/mp4" />
        </video>
        
        {/* 비디오 위의 가독성을 위한 살짝 어두운 틴트 오버레이 */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
      </div>



      {/* Hero Text Overlay */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 h-full flex flex-col items-center justify-center text-center">
        <motion.h1 
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white drop-shadow-2xl leading-[1.3] tracking-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
        >
          Stop paying the{' '}
          <span className="text-cyan-400 whitespace-nowrap">"foreigner tax."</span>
          <br />
          No more hidden fees.
        </motion.h1>
        
        <motion.p 
          className="mt-6 md:mt-8 text-xl sm:text-2xl text-neutral-100 font-medium drop-shadow-lg max-w-3xl leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
        >
          No ARC? No Korean bank? No problem.<br className="hidden sm:block" />
          <span className="sm:hidden"> </span>
          Get connected instantly with just your passport.
        </motion.p>

        {/* 스크롤 인디케이터 */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <span className="text-black/50 text-xs font-medium tracking-widest uppercase">Scroll</span>
          <motion.div
            className="w-[1.5px] h-8 bg-black/50 rounded-full origin-top"
            animate={{ scaleY: [0.3, 1, 0.3] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </div>
    </section>
  );
}
