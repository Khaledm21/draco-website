import { cn } from '@/utils'
import logoImg from '@/assets/images/logo.png'

export default function DragonLogo({size=80,className='',glow=false,animate=false}){
  return(
    <div 
      className={cn(
        'relative flex items-center justify-center',
        glow && 'animate-glow-pulse',
        animate && 'animate-float',
        className
      )}
      style={{ width: size, height: size }}
    >
      {glow && (
        <div className="absolute inset-0 bg-brand-red/20 blur-2xl rounded-full" />
      )}
      <img 
        src={logoImg} 
        alt="DRACO Logo" 
        className="w-full h-full object-contain relative z-10"
      />
    </div>
  )
}

