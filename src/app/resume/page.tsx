import { RESUME_DATA } from "@/resume-data";
import { NeoButton } from "@/components/NeoButton";
import { PrintButton } from "@/components/PrintButton";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `${RESUME_DATA.name} - Resume`,
  description: `Resume of ${RESUME_DATA.name} - ${RESUME_DATA.about}`,
};

export default function ResumePage() {
  return (
    <main className="container relative mx-auto min-h-screen scroll-my-12 overflow-auto p-4 md:p-16 print:p-0">
      <div className="no-print mb-8 flex items-center justify-between">
        <Link href="/">
          <NeoButton variant="outline" size="sm" className="bg-white">
            <ArrowLeft className="mr-2 h-4 w-4" />
            RETURN_HOME
          </NeoButton>
        </Link>
        <PrintButton />
      </div>

      <section className="mx-auto w-full max-w-2xl bg-white p-8 shadow-neo print:border-0 print:bg-transparent print:p-0 print:shadow-none">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between border-b-3 border-neo-black pb-8 print:border-black">
          <div>
            <h1 className="font-sans text-4xl font-black uppercase tracking-tight">{RESUME_DATA.name}</h1>
            <p className="font-mono text-lg font-bold text-neo-dark-grey print:text-black">
              {RESUME_DATA.about}
            </p>
            <p className="mt-2 font-mono text-sm text-neo-dark-grey print:text-black">
              {RESUME_DATA.location}
            </p>
          </div>
          <div className="text-right font-mono text-sm leading-relaxed">
             <a href={`mailto:${RESUME_DATA.contact.email}`} className="block hover:underline hover:text-neo-pink">
               {RESUME_DATA.contact.email}
             </a>
             <a href={`tel:${RESUME_DATA.contact.tel}`} className="block hover:underline hover:text-neo-pink">
               {RESUME_DATA.contact.tel}
             </a>
             <a href={RESUME_DATA.personalWebsiteUrl} className="block hover:underline hover:text-neo-pink">
               {RESUME_DATA.personalWebsiteUrl}
             </a>
          </div>
        </div>

        {/* Summary */}
        <div className="mb-8">
           <h2 className="mb-4 border-l-4 border-neo-pink pl-4 font-sans text-2xl font-black uppercase text-black print:border-black">Summary</h2>
           <p className="font-mono text-sm leading-relaxed text-justify">{RESUME_DATA.summary}</p>
        </div>

        {/* Experience */}
        <div className="mb-8">
          <h2 className="mb-4 border-l-4 border-neo-pink pl-4 font-sans text-2xl font-black uppercase text-black print:border-black">Experience</h2>
          <div className="space-y-8">
            {RESUME_DATA.work.map((work) => (
              <div key={work.company} className="relative pl-4 before:absolute before:bottom-0 before:left-0 before:top-0 before:w-[2px] before:bg-neo-black print:before:bg-black">
                <div className="mb-2 flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
                  <h3 className="font-sans text-xl font-bold">{work.company}</h3>
                  <span className="font-mono text-xs font-bold bg-concrete px-2 py-1 print:bg-transparent print:border print:border-black">
                    {work.start} - {work.end}
                  </span>
                </div>
                <p className="mb-2 font-mono text-sm font-bold text-neo-pink print:text-black">{work.title}</p>
                <p className="font-mono text-sm text-neo-dark-grey print:text-black">{work.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div className="mb-8">
          <h2 className="mb-4 border-l-4 border-neo-pink pl-4 font-sans text-2xl font-black uppercase text-black print:border-black">Education</h2>
          {RESUME_DATA.education.map((edu) => (
            <div key={edu.school} className="mb-4">
               <h3 className="font-sans text-lg font-bold">{edu.school}</h3>
               <p className="font-mono text-sm">{edu.degree}</p>
               <p className="font-mono text-xs text-neo-dark-grey print:text-black">{edu.start} - {edu.end}</p>
            </div>
          ))}
        </div>

        {/* Skills */}
        <div>
          <h2 className="mb-4 border-l-4 border-neo-pink pl-4 font-sans text-2xl font-black uppercase text-black print:border-black">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {RESUME_DATA.skills.map((skill) => (
              <span key={skill} className="border-2 border-neo-black bg-concrete px-2 py-1 font-mono text-xs font-bold shadow-[2px_2px_0px_0px_#000] print:bg-transparent print:border-black print:shadow-none">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

