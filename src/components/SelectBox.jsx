// components/SelectBox.jsx
import { Listbox } from "@headlessui/react";
import { ChevronDown } from "lucide-react";

export default function SelectBox({ name, value, onChange, options }) {
  return (
    <Listbox value={value} onChange={onChange}>
      <div className="relative">
        <Listbox.Button
          className="w-full cursor-pointer rounded-xl border border-slate-200
                     bg-white px-4 py-2.5 text-sm text-left
                     focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400
                     flex items-center justify-between transition-all duration-200"
        >
          <span className="capitalize">{value}</span>
          <ChevronDown size={16} className="text-slate-400" />
        </Listbox.Button>

        <Listbox.Options
          className="absolute z-10 mt-2 w-full rounded-xl bg-white
                     border border-slate-200 shadow-lg py-1"
        >
          {options.map((option) => (
            <Listbox.Option
              key={option}
              value={option}
              className={({ active }) =>
                `cursor-pointer px-4 py-2 text-sm capitalize
                 ${active ? "bg-indigo-50 text-indigo-700" : "text-slate-700"}`
              }
            >
              {option}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </div>
    </Listbox>
  );
}