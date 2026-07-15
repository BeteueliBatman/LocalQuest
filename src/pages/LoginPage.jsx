import { Eye, EyeOff, KeyRound } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import useAuth from '../hooks/useAuth'

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [serverError, setServerError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: { username: '', password: '' } })

  const previousLocation = location.state?.from
  const destination = previousLocation
    ? `${previousLocation.pathname}${previousLocation.search || ''}`
    : '/my-quests'

  const fillDemoAccount = () => {
    setValue('username', 'emilys', { shouldValidate: true })
    setValue('password', 'emilyspass', { shouldValidate: true })
  }

  const onSubmit = async (values) => {
    setServerError('')

    try {
      await login(values)
      navigate(destination, { replace: true })
    } catch (error) {
      setServerError(error.message)
    }
  }

  return (
    <section className="auth-page">
      <div className="auth-image" aria-hidden="true" />
      <div className="auth-content">
        <div className="auth-card">
          <span className="auth-icon">
            <KeyRound aria-hidden="true" />
          </span>
          <span className="eyebrow">Welcome back</span>
          <h1>Log in to track your quests.</h1>
          <p>Use the demo account below to open your personal dashboard.</p>

          <button
            className="demo-account"
            type="button"
            onClick={fillDemoAccount}
          >
            <strong>Demo account</strong>
            <span>emilys / emilyspass</span>
            <small>Click to fill the form</small>
          </button>

          <form className="form" noValidate onSubmit={handleSubmit(onSubmit)}>
            <label className="form-field">
              <span>Username</span>
              <input
                type="text"
                id="username"
                autoComplete="username"
                aria-invalid={Boolean(errors.username)}
                aria-describedby={
                  errors.username ? 'username-error' : undefined
                }
                {...register('username', {
                  required: 'Username is required.',
                  setValueAs: (value) => value.trim(),
                  minLength: {
                    value: 3,
                    message: 'Use at least 3 characters.',
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9_]+$/,
                    message: 'Use only letters, numbers and underscore.',
                  },
                })}
              />
              {errors.username && (
                <small className="form-error" id="username-error">
                  {errors.username.message}
                </small>
              )}
            </label>

            <label className="form-field">
              <span>Password</span>
              <span className="password-field">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  autoComplete="current-password"
                  aria-invalid={Boolean(errors.password)}
                  aria-describedby={
                    errors.password ? 'password-error' : undefined
                  }
                  {...register('password', {
                    required: 'Password is required.',
                    minLength: {
                      value: 6,
                      message: 'Use at least 6 characters.',
                    },
                  })}
                />
                <button
                  type="button"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  onClick={() => setShowPassword((current) => !current)}
                >
                  {showPassword ? (
                    <EyeOff aria-hidden="true" />
                  ) : (
                    <Eye aria-hidden="true" />
                  )}
                </button>
              </span>
              {errors.password && (
                <small className="form-error" id="password-error">
                  {errors.password.message}
                </small>
              )}
            </label>

            {serverError && (
              <p className="form-server-error" role="alert">
                {serverError}
              </p>
            )}

            <Button
              className="button--full"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Logging in...' : 'Log in'}
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default LoginPage
