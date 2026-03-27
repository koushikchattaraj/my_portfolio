import { motion, AnimatePresence } from "framer-motion";
import { useCallback, useEffect, useId, useState, type FormEvent } from "react";
import { useAuth } from "../context/AuthContext";

type Props = {
  open: boolean;
  onClose: () => void;
  /** Called when login succeeds, before the dialog closes. */
  onSuccess?: () => void;
};

export function LoginModal({ open, onClose, onSuccess }: Props) {
  const { login } = useAuth();
  const titleId = useId();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  /** Bumped after resetting stored creds so hint re-reads localStorage. */

  const finishClose = useCallback(() => {
    setUsername("");
    setPassword("");
    setError(null);
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") finishClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, finishClose]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    const ok = login(username, password);
    if (ok) {
      onSuccess?.();
      finishClose();
    } else setError("Invalid username or password.");
  };

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="login-modal-backdrop"
          role="presentation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={finishClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="login-modal"
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            onClick={(ev) => ev.stopPropagation()}
          >
            <h2 id={titleId} className="login-modal-title">
              Sign in to edit
            </h2>
            <form onSubmit={handleSubmit} className="login-modal-form">
              <label>
                Username
                <input
                  autoComplete="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </label>
              <label>
                Password
                <input
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </label>
              {error ? <p className="login-modal-error">{error}</p> : null}
              <div className="login-modal-actions">
                <button
                  type="button"
                  className="login-btn-secondary"
                  onClick={finishClose}
                >
                  Cancel
                </button>
                <button type="submit" className="login-btn-primary">
                  Sign in
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
