import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const navLink =
  "rounded-xl px-3 py-2 text-sm font-medium text-slate-500 transition hover:bg-slate-100 hover:text-slate-900";
const activeNavLink =
  "rounded-xl bg-sky-50 px-3 py-2 text-sm font-medium text-sky-700";

function LogoMark() {
  return (
    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-100 ring-1 ring-sky-200">
      <svg
        viewBox="0 0 64 64"
        className="h-6 w-6"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="10" y="18" width="12" height="28" rx="4" fill="#0ea5e9" />
        <rect x="26" y="10" width="12" height="36" rx="4" fill="#38bdf8" />
        <rect x="42" y="26" width="12" height="20" rx="4" fill="#7dd3fc" />
      </svg>
    </div>
  );
}

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <aside className="sticky top-0 h-screen w-64 border-r border-slate-200 bg-white">
      <div className="flex h-full flex-col p-6">
        <div className="mb-8 flex items-center gap-3">
          <LogoMark />
          <div>
            <div className="text-lg font-semibold text-slate-900">
              CRM Sales System
            </div>
            <div className="mt-1 text-sm text-slate-500">
              Sales pipeline management
            </div>
          </div>
        </div>

        {user ? (
          <>
            <nav className="flex flex-col gap-2">
              <NavLink
                to="/dashboard"
                className={({ isActive }) => (isActive ? activeNavLink : navLink)}
              >
                Dashboard
              </NavLink>

              <NavLink
                to="/leads"
                className={({ isActive }) => (isActive ? activeNavLink : navLink)}
              >
                Leads
              </NavLink>

              <NavLink
                to="/companies"
                className={({ isActive }) => (isActive ? activeNavLink : navLink)}
              >
                Companies
              </NavLink>

              <NavLink
                to="/pipeline"
                className={({ isActive }) => (isActive ? activeNavLink : navLink)}
              >
                Pipeline
              </NavLink>
            </nav>

            <div className="mt-auto rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="text-sm font-medium text-slate-900">
                Hi, {user.name}
              </div>
              <div className="mt-1 text-xs text-slate-500">
                Authenticated user
              </div>

              <button
                onClick={handleLogout}
                className="mt-4 inline-flex w-full items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
              >
                Logout
              </button>
            </div>
          </>
        ) : (
          <nav className="flex flex-col gap-2">
            <NavLink
              to="/login"
              className={({ isActive }) => (isActive ? activeNavLink : navLink)}
            >
              Login
            </NavLink>

            <NavLink
              to="/register"
              className={({ isActive }) => (isActive ? activeNavLink : navLink)}
            >
              Register
            </NavLink>
          </nav>
        )}
      </div>
    </aside>
  );
}