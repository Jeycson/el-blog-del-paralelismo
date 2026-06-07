import { TableData } from "@/types";

interface AcademicTableProps {
  data: TableData;
  tableNumber?: number;
}

export default function AcademicTable({ data, tableNumber }: AcademicTableProps) {
  return (
    <figure className="my-10 not-prose">
      {tableNumber && (
        <p className="text-[11px] tracking-widest uppercase font-semibold text-[#1e3a5f] mb-2">
          Tabla {tableNumber}
        </p>
      )}
      <p className="text-[14px] font-medium text-slate-700 mb-3 leading-snug max-w-prose">
        {data.caption}
      </p>
      <div className="overflow-x-auto rounded-sm border border-slate-200 shadow-sm">
        <table className="w-full min-w-[500px] text-sm border-collapse">
          <thead>
            <tr className="bg-[#1e3a5f] text-white">
              {data.headers.map((h, i) => (
                <th
                  key={i}
                  className={`px-4 py-3 text-left text-[11px] tracking-wider uppercase font-semibold ${
                    i === 0 ? "rounded-tl-sm" : ""
                  } ${i === data.headers.length - 1 ? "rounded-tr-sm" : ""}`}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.rows.map((row, ri) => (
              <tr
                key={ri}
                className={`border-t border-slate-100 ${
                  ri % 2 === 0 ? "bg-white" : "bg-slate-50/60"
                } hover:bg-blue-50/40 transition-colors duration-75`}
              >
                {row.map((cell, ci) => (
                  <td
                    key={ci}
                    className={`px-4 py-2.5 text-[13px] border-r border-slate-100 last:border-0 ${
                      ci === 0
                        ? "font-medium text-slate-800 font-mono text-[12px]"
                        : "text-slate-600 tabular-nums"
                    } ${
                      data.highlightCol !== undefined && ci === data.highlightCol
                        ? "text-[#1e3a5f] font-semibold bg-blue-50/60"
                        : ""
                    }`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </figure>
  );
}
