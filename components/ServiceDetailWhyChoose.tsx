import React from 'react';
import { Check } from 'lucide-react';

export default function ServiceDetailWhyChoose({ data }: { data: any }) {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 lg:px-10 py-16 md:py-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
        <div className="flex flex-col space-y-6">
          <h3 className="text-red-600 font-bold tracking-[0.2em] text-sm uppercase">
            {data.subtitle}
          </h3>
          <h2 className="text-4xl md:text-5xl lg:text-[44px] font-bold font-sans uppercase leading-[1.1] tracking-tight">
            <span className="text-white mr-3 block md:inline">{data.titleLine1}</span>
            <span className="text-red-600 block md:inline">{data.titleLine2}</span>
          </h2>
          <p className="text-gray-400 text-sm md:text-base leading-relaxed pt-2">
            {data.description}
          </p>
        </div>

        <div className="flex flex-col justify-center space-y-5">
          {data.list.map((item: string, idx: number) => (
            <div key={idx} className="flex items-start space-x-5">
              <div className="bg-red-600 rounded-full mt-0.5 w-6 h-6 flex items-center justify-center shrink-0">
                <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
              </div>
              <span className="text-gray-300 text-sm md:text-base">
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
