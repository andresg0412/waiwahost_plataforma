'use client';

import { useAuth } from '../../auth/AuthContext';
import { useState } from 'react';
import { Button } from '../../components/atoms/Button';
import { Input } from '../../components/atoms/Input';
import { Label } from '../../components/atoms/Label';
import { Spinner } from '../../components/atoms/Spinner';
import { PasswordInput } from "../../components/atoms/PasswordInput";
import { ResetPasswordModal } from '../../components/organisms/ResetPasswordModal';
import { loginUser } from '../../auth/loginApi';

export default function LoginPage() {
  const { login } = useAuth();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showReset, setShowReset] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const { token, user } = await loginUser(identifier, password);
      login(token, user);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : String(e));
      setLoading(false);
    }
  };

  if (loading) return <Spinner />;

  return (
    <div className="min-h-screen flex bg-white">

      <div className="w-full lg:w-[55%] flex flex-col justify-center px-10 sm:px-16 lg:px-56 py-16">

        {/* Logo */}
        <div className="flex items-center gap-3 mb-10">
          <img
            src="/img/Waiwa Host_Logo (15).png"
            alt="Waiwa Host Logo"
            className="w-14 h-14 rounded-lg object-contain"
          />
          <span className="text-[#0c4136] font-mono font-bold text-3xl tracking-tight">WAIWA HOST</span>
        </div>

        {/* Encabezado */}
        <div className="mb-10">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2 leading-tight">
            Bienvenido de nuevo!
          </h1>
          <p className="text-black font-bold text-sm">
            Ingresa tus credenciales para acceder a tu panel
          </p>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Correo / Usuario */}
          <div className="space-y-1.5">
            <Label htmlFor="identifier" className="text-gray-700 text-sm font-medium">
              Correo o usuario
            </Label>
            <div className="relative">
              <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <Input
                id="identifier"
                type="text"
                placeholder="tu@empresa.com"
                className="pl-10 border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-300 focus:border-[#0c4136] focus:ring-1 focus:ring-[#0c4136] bg-gray-50"
                value={identifier}
                onChange={e => setIdentifier(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Contraseña */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-gray-700 text-sm font-medium">
                Contraseña
              </Label>
              <button
                type="button"
                className="text-xs text-[#0c4136] hover:text-[#e7b61d] transition-colors font-medium"
                onClick={() => setShowReset(true)}
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>
            <PasswordInput
              id="password"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="py-2 rounded-xl border-gray-200 text-gray-900 bg-gray-50 focus:border-[#0c4136] focus:ring-1 focus:ring-[#0c4136]"
              leftIcon={
                <svg className="h-4 w-4 text-gray-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <rect x="3" y="11" width="18" height="11" rx="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              }
            />
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-100 text-red-500 text-xs rounded-xl px-4 py-3">
              {error}
            </div>
          )}

          {/* Botón */}
          <Button
            type="submit"
            className="w-full  bg-[#0c4136] hover:bg-[#0f5245] active:bg-[#0a3530] text-white font-semibold rounded-xl transition-all duration-200 shadow-sm hover:shadow-md text-base"
          >
            Iniciar Sesión
          </Button>
        </form>

        {/* Success reset */}
        {resetSuccess && (
          <div className="mt-5 bg-green-50 border border-green-100 text-green-600 text-xs rounded-xl px-4 py-3 text-center">
            Contraseña restablecida. Ahora puedes iniciar sesión.
          </div>
        )}

        {/* Footer */}
        <p className="text-xs text-black mt-16">
          © 2025 Waiwahost · Gestión Inmobiliaria
        </p>

        <ResetPasswordModal
          open={showReset}
          onClose={() => setShowReset(false)}
          onSuccess={() => {
            setShowReset(false);
            setResetSuccess(true);
            setTimeout(() => setResetSuccess(false), 5000);
          }}
        />
      </div>

      {/* ─── RIGHT — foto ──────────────────────────────────── */}
      <div className="hidden lg:block lg:w-[45%] relative rounded-l-9xl">
        <img
          src="/img/posts/WHP_01(C).jpg"
          alt="Waiwa Host"
          className="absolute inset-0 w-full h-full object-cover rounded-l-[30px]"
        />
        {/* Degradado sutil en el borde izquierdo para que no corte duro */}
        <div className="absolute inset-y-0 left-0 w-16 " />
      </div>

    </div>
  );
}
