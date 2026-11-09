import React, { useState } from 'react';
import { FirebaseError } from 'firebase/app';
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  BookOpen,
  CalendarDays,
  GraduationCap,
  Mail,
  ShieldCheck,
  Sparkles,
  Timer,
} from 'lucide-react';
import {
  createEmailAccount,
  firebaseConfigured,
  signInWithEmail,
  signInWithGoogle,
} from '../utils/firebase';

export const StudentEntry: React.FC = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const runAuthAction = async (action: () => Promise<unknown>) => {
    setError('');
    setBusy(true);
    try {
      await action();
    } catch (cause) {
      const code = cause instanceof FirebaseError ? cause.code : '';
      const messages: Record<string, string> = {
        'auth/email-already-in-use': 'Email này đã được đăng ký.',
        'auth/invalid-credential': 'Email hoặc mật khẩu không chính xác.',
        'auth/invalid-email': 'Địa chỉ email không hợp lệ.',
        'auth/weak-password': 'Mật khẩu cần có ít nhất 6 ký tự.',
        'auth/popup-closed-by-user': 'Cửa sổ đăng nhập Google đã bị đóng.',
        'auth/unauthorized-domain': 'Tên miền hiện tại chưa được cho phép trong Firebase.',
      };
      setError(messages[code] ?? 'Không thể xác thực. Vui lòng thử lại sau.');
    } finally {
      setBusy(false);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    return runAuthAction(() =>
      mode === 'signup'
        ? createEmailAccount(email, password, name)
        : signInWithEmail(email, password)
    );
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <div className="pointer-events-none absolute -left-40 -top-40 h-96 w-96 rounded-full bg-orange-600/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-48 -right-32 h-[32rem] w-[32rem] rounded-full bg-amber-500/10 blur-3xl" />

      <header className="relative mx-auto flex max-w-7xl items-center gap-3 px-5 py-6 sm:px-8">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 shadow-lg shadow-orange-950/40">
          <GraduationCap className="h-6 w-6" />
        </div>
        <div>
          <p className="font-extrabold tracking-tight">FPTU Study Budget</p>
          <p className="text-xs text-slate-400">Không gian học tập dành cho sinh viên</p>
        </div>
      </header>

      {!showLogin ? (
        <main className="relative mx-auto grid min-h-[calc(100vh-96px)] max-w-7xl items-center gap-12 px-5 pb-16 pt-6 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <section className="max-w-2xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-400/20 bg-orange-400/10 px-3.5 py-2 text-xs font-bold text-orange-200">
              <Sparkles className="h-4 w-4" />
              Học tập chủ động, tiến bộ mỗi tuần
            </div>
            <h1 className="text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Chào mừng bạn đến với
              <span className="mt-2 block bg-gradient-to-r from-orange-300 via-amber-300 to-orange-500 bg-clip-text text-transparent">
                hành trình học tập mới.
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-slate-300 sm:text-lg">
              Lập lịch học theo Slot, quản lý môn học và theo dõi tiến độ của bạn
              trong một không gian gọn gàng, dễ bắt đầu.
            </p>

            <div className="mt-9 grid max-w-xl gap-3 sm:grid-cols-2">
              {[
                { icon: CalendarDays, title: 'Lịch học theo Slot', detail: 'Sắp xếp tuần học rõ ràng' },
                { icon: Timer, title: 'Tập trung hiệu quả', detail: 'Theo dõi thời gian học' },
                { icon: BookOpen, title: 'Quản lý môn học', detail: 'Cân đối quỹ giờ từng môn' },
                { icon: BarChart3, title: 'Nhìn lại tiến độ', detail: 'Tổng kết và cải thiện mỗi tuần' },
              ].map(({ icon: Icon, title, detail }) => (
                <div key={title} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-500/15 text-orange-300">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-sm font-bold">{title}</span>
                    <span className="mt-0.5 block text-xs text-slate-400">{detail}</span>
                  </span>
                </div>
              ))}
            </div>

            <button
              onClick={() => setShowLogin(true)}
              className="mt-9 inline-flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-3.5 text-sm font-extrabold text-white shadow-lg shadow-orange-950/40 transition hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:ring-offset-2 focus:ring-offset-slate-950"
            >
              Bắt đầu ngay
              <ArrowRight className="h-4 w-4" />
            </button>
          </section>

          <aside className="mx-auto w-full max-w-md">
            <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/10 to-white/[0.03] p-5 shadow-2xl shadow-black/30 backdrop-blur sm:p-7">
              <div className="rounded-3xl bg-slate-900/80 p-5 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-slate-400">TỔNG QUAN TUẦN</p>
                    <p className="mt-1 text-xl font-extrabold">Bắt đầu từ hôm nay</p>
                  </div>
                  <span className="rounded-2xl bg-orange-500/15 p-3 text-orange-300">
                    <CalendarDays className="h-5 w-5" />
                  </span>
                </div>
                <div className="mt-7 space-y-3">
                  {[
                    { label: 'Lên kế hoạch học tập', width: 'w-4/5' },
                    { label: 'Theo dõi thời gian', width: 'w-3/5' },
                    { label: 'Đánh giá tiến độ', width: 'w-2/3' },
                  ].map((item, index) => (
                    <div key={item.label} className="flex items-center gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.03] p-3.5">
                      <span className={`flex h-7 w-7 items-center justify-center rounded-lg text-xs font-bold ${index === 0 ? 'bg-orange-500 text-white' : 'bg-white/10 text-slate-400'}`}>
                        0{index + 1}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-slate-200">{item.label}</p>
                        <div className="mt-2 h-1.5 rounded-full bg-white/10">
                          <div className={`h-full rounded-full bg-gradient-to-r from-orange-500 to-amber-400 ${item.width}`} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-5 flex items-center gap-2 rounded-xl bg-emerald-400/10 px-3.5 py-3 text-xs font-semibold text-emerald-300">
                  <ShieldCheck className="h-4 w-4 shrink-0" />
                  Đăng nhập để lưu và đồng bộ dữ liệu học tập
                </div>
              </div>
            </div>
          </aside>
        </main>
      ) : (
        <main className="relative flex min-h-[calc(100vh-96px)] items-center justify-center px-5 pb-16 pt-4">
          <section className="w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.06] p-6 shadow-2xl shadow-black/30 backdrop-blur sm:p-8">
            <button
              onClick={() => { setShowLogin(false); setError(''); }}
              className="mb-6 inline-flex items-center gap-2 text-xs font-bold text-slate-400 transition hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Quay lại trang chào mừng
            </button>
            <div className="mb-6">
              <p className="text-sm font-bold text-orange-300">Chào mừng bạn trở lại</p>
              <h1 className="mt-1 text-2xl font-extrabold tracking-tight">
                {mode === 'signup' ? 'Tạo tài khoản học tập' : 'Đăng nhập'}
              </h1>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                Đăng nhập để tiếp tục vào lịch học và các công cụ của bạn.
              </p>
            </div>

            {!firebaseConfigured ? (
              <div className="rounded-2xl border border-amber-400/20 bg-amber-400/10 p-4 text-sm leading-6 text-amber-100">
                Đăng nhập chưa khả dụng vì Firebase chưa được cấu hình. Hãy thiết lập các biến
                {' '}<code className="rounded bg-black/20 px-1">VITE_FIREBASE_*</code> theo hướng dẫn
                {' '}<code className="rounded bg-black/20 px-1">FIREBASE_SETUP.md</code>.
              </div>
            ) : (
              <>
                <div className="mb-5 grid grid-cols-2 rounded-xl bg-black/20 p-1">
                  <button
                    onClick={() => { setMode('signin'); setError(''); }}
                    className={`rounded-lg py-2.5 text-xs font-bold transition ${mode === 'signin' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-white'}`}
                  >
                    Đăng nhập
                  </button>
                  <button
                    onClick={() => { setMode('signup'); setError(''); }}
                    className={`rounded-lg py-2.5 text-xs font-bold transition ${mode === 'signup' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-white'}`}
                  >
                    Tạo tài khoản
                  </button>
                </div>

                {error && (
                  <p role="alert" className="mb-4 rounded-xl border border-red-400/20 bg-red-400/10 px-3.5 py-3 text-xs font-medium text-red-200">
                    {error}
                  </p>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  {mode === 'signup' && (
                    <label className="block space-y-1.5 text-xs font-semibold text-slate-300">
                      Tên sinh viên
                      <input
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        autoComplete="name"
                        required
                        className="w-full rounded-xl border border-white/10 bg-slate-950/60 px-3.5 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-orange-400"
                        placeholder="Nguyễn Văn A"
                      />
                    </label>
                  )}
                  <label className="block space-y-1.5 text-xs font-semibold text-slate-300">
                    Email
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      autoComplete="email"
                      className="w-full rounded-xl border border-white/10 bg-slate-950/60 px-3.5 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-orange-400"
                      placeholder="you@example.com"
                    />
                  </label>
                  <label className="block space-y-1.5 text-xs font-semibold text-slate-300">
                    Mật khẩu
                    <input
                      type="password"
                      required
                      minLength={6}
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
                      className="w-full rounded-xl border border-white/10 bg-slate-950/60 px-3.5 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-orange-400"
                      placeholder="Ít nhất 6 ký tự"
                    />
                  </label>
                  <button
                    type="submit"
                    disabled={busy}
                    className="w-full rounded-xl bg-orange-500 px-4 py-3.5 text-sm font-extrabold text-white transition hover:bg-orange-400 disabled:cursor-wait disabled:opacity-60"
                  >
                    {busy ? 'Đang xử lý...' : mode === 'signup' ? 'Tạo tài khoản' : 'Đăng nhập'}
                  </button>
                </form>

                <div className="my-5 flex items-center gap-3 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  <span className="h-px flex-1 bg-white/10" />
                  hoặc tiếp tục với
                  <span className="h-px flex-1 bg-white/10" />
                </div>
                <button
                  onClick={() => runAuthAction(signInWithGoogle)}
                  disabled={busy}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/15 px-4 py-3 text-sm font-bold text-slate-200 transition hover:bg-white/[0.06] disabled:cursor-wait disabled:opacity-60"
                >
                  <Mail className="h-4 w-4" />
                  Google
                </button>
              </>
            )}
          </section>
        </main>
      )}
    </div>
  );
};
