import { cn } from '@/utils'

export default function ColorSelector({ colors, colorNames, selected, onChange }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="font-condensed text-[10px] tracking-[.3em] text-zinc-500 uppercase">
          COLOR: <span className="text-white ml-2">{colorNames[colors.indexOf(selected)]}</span>
        </span>
      </div>
      <div className="flex flex-wrap gap-3">
        {colors.map((color, i) => (
          <button
            key={color}
            onClick={() => onChange(color)}
            className={cn(
              "group relative w-10 h-10 rounded-full flex items-center justify-center transition-all",
              selected === color 
                ? "ring-1 ring-brand-red ring-offset-4 ring-offset-black scale-110" 
                : "hover:scale-105"
            )}
            title={colorNames[i]}
          >
            <span 
              className="w-full h-full rounded-full border border-white/10" 
              style={{ backgroundColor: color }}
            />
            {selected === color && (
              <span className="absolute -inset-1 rounded-full border border-brand-red/30 animate-pulse-slow" />
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
