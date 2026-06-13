import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-ink/8 bg-parchment/50">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-12 md:flex-row md:items-end md:justify-between md:px-8">
        <div>
          <p className="font-gujarati text-lg font-semibold text-ink">
            સંકલ્પ સેવા સમર્પણ ચેરિટેબલ ટ્રસ્ટ
          </p>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-mist">
            Serving the community through seva, compassion, and collective
            dedication.
          </p>
        </div>
        <div className="flex flex-col gap-3 text-sm text-earth md:items-end">
          <Link to="/donors" className="transition hover:text-gold">
            Donor Recognition
          </Link>
          <Link to="/admin" className="text-xs uppercase tracking-editorial text-mist transition hover:text-ink">
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}
