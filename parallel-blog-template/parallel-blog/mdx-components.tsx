// mdx-components.tsx (EN LA RAÍZ DEL PROYECTO)
import type { MDXComponents } from 'mdx/types'
  import AcademicTable from '@/app/components/article/AcademicTable'
  import CalloutBlock from '@/app/components/article/CalloutBlock'
  import ChartContainer, { ChartPlaceholder } from '@/app/components/article/ChartContainer'
  import ArticleImage from '@/app/components/article/ArticleImage'
  export function useMDXComponents(components: MDXComponents): MDXComponents {
    return {
      ...components,
      // Tus componentes custom
      AcademicTable,
      CalloutBlock,
      ChartContainer,
      ChartPlaceholder,
      ArticleImage,

      // Tus overrides de diseño HTML nativo
      h2: ({ children, ...props }) => (
        <h2 className="font-serif text-2xl font-bold text-slate-900 mt-12 mb-4 pb-2 border-b border-slate-200" {...props}>
          {children}
        </h2>
      ),
      h3: ({ children, ...props }) => (
        <h3 className="font-serif text-xl font-semibold text-slate-800 mt-8 mb-3" {...props}>
          {children}
        </h3>
      ),
      p: ({ children }) => <p className="text-[15px] text-slate-700 leading-[1.85] mb-5">{children}</p>,
      code: ({ children }) => (
        <code className="font-mono text-[13px] bg-slate-100 text-[#1e3a5f] px-1.5 py-0.5 rounded border border-slate-200">
          {children}
        </code>
      ),
      ul: ({ children }) => (
        <ul className="list-disc list-inside space-y-2 mb-6 pl-2
                      text-[15px] text-slate-700 leading-relaxed">
          {children}
        </ul>
      ),

      li: ({ children }) => (
        <li className="marker:text-[#1e3a5f] pl-1">
          {children}
        </li>
      ),


      ol: ({ children }) => (
        <ol className="list-decimal list-inside space-y-2 mb-6 pl-2
                      text-[15px] text-slate-700 leading-relaxed">
          {children}
        </ol>
      ),
    }
  }