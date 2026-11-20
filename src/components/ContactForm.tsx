import { type FormEvent, useId, useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import { buildWhatsAppUrl, siteConfig } from '../config/site';

interface FormValues {
  name: string;
  phone: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  message: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  checkIn?: string;
  checkOut?: string;
  guests?: string;
}

const initialValues: FormValues = {
  name: '',
  phone: '',
  checkIn: '',
  checkOut: '',
  guests: 2,
  message: '',
};

function getLocalTodayIso(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function isValidIndianPhone(raw: string): boolean {
  const digits = raw.replace(/\D/g, '');
  let localTen = digits;
  if (digits.length === 12 && digits.startsWith('91')) {
    localTen = digits.slice(2);
  } else if (digits.length === 11 && digits.startsWith('0')) {
    localTen = digits.slice(1);
  }
  return /^[6-9]\d{9}$/.test(localTen);
}

export function ContactForm() {
  const formId = useId();
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});

  const todayIso = getLocalTodayIso();

  const validate = (data: FormValues): FormErrors => {
    const nextErrors: FormErrors = {};

    if (!data.name.trim() || data.name.trim().length < 2) {
      nextErrors.name = 'Please enter your name.';
    }

    if (!isValidIndianPhone(data.phone)) {
      nextErrors.phone = 'Enter a valid 10-digit Indian mobile number.';
    }

    if (!data.checkIn) {
      nextErrors.checkIn = 'Choose a check-in date.';
    } else if (data.checkIn < todayIso) {
      nextErrors.checkIn = 'Check-in cannot be before today.';
    }

    if (!data.checkOut) {
      nextErrors.checkOut = 'Choose a check-out date.';
    } else if (data.checkIn && data.checkOut <= data.checkIn) {
      nextErrors.checkOut = 'Check-out must be after check-in.';
    }

    if (data.guests < 1 || data.guests > 10) {
      nextErrors.guests = 'Select between 1 and 10 guests.';
    }

    return nextErrors;
  };

  const composeWhatsAppText = (data: FormValues): string => {
    const trimmedMsg = data.message.trim();
    const parts = [
      `Hi Samco Residency, I'm ${data.name.trim()}.`,
      `I'd like to enquire about ${data.checkIn} to ${data.checkOut} for ${data.guests} guests.`,
    ];
    if (trimmedMsg) {
      parts.push(trimmedMsg);
    }
    parts.push(`My number: ${data.phone.trim()}.`);
    return parts.join(' ');
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationErrors = validate(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    const waUrl = buildWhatsAppUrl(composeWhatsAppText(values), 0);
    const anchor = document.createElement('a');
    anchor.href = waUrl;
    anchor.target = '_blank';
    anchor.rel = 'noopener noreferrer';
    anchor.click();
  };

  const fieldClass =
    'w-full h-12 min-h-[48px] rounded-[16px] border border-[#14341F]/12 bg-[#F3F9F4]/65 px-4 text-base font-normal text-[#122318] placeholder:text-[#4A5D50]/75 focus:border-[#14341F] focus:bg-[#FFFFFF] focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-[#14341F] transition-colors duration-200';

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="space-y-6"
      aria-describedby={`${formId}-notice`}
    >
      {/* Name & Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor={`${formId}-name`}
            className="block text-sm font-medium text-[#122318] mb-2"
          >
            Name
          </label>
          <input
            id={`${formId}-name`}
            name="name"
            type="text"
            required
            autoComplete="name"
            value={values.name}
            onChange={(e) => {
              setValues((prev) => ({ ...prev, name: e.target.value }));
              if (errors.name) {
                setErrors((prev) => ({ ...prev, name: undefined }));
              }
            }}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? `${formId}-name-err` : undefined}
            className={fieldClass}
            placeholder="Your full name"
          />
          {errors.name && (
            <p
              id={`${formId}-name-err`}
              role="alert"
              className="mt-2 text-sm font-medium text-[#14341F]"
            >
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor={`${formId}-phone`}
            className="block text-sm font-medium text-[#122318] mb-2"
          >
            Phone
          </label>
          <input
            id={`${formId}-phone`}
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            inputMode="tel"
            value={values.phone}
            onChange={(e) => {
              setValues((prev) => ({ ...prev, phone: e.target.value }));
              if (errors.phone) {
                setErrors((prev) => ({ ...prev, phone: undefined }));
              }
            }}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? `${formId}-phone-err` : undefined}
            className={fieldClass}
            placeholder="10-digit mobile number"
          />
          {errors.phone && (
            <p
              id={`${formId}-phone-err`}
              role="alert"
              className="mt-2 text-sm font-medium text-[#14341F]"
            >
              {errors.phone}
            </p>
          )}
        </div>
      </div>

      {/* Check-in, Check-out & Guests stepper */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div>
          <label
            htmlFor={`${formId}-checkin`}
            className="block text-sm font-medium text-[#122318] mb-2"
          >
            Check-in
          </label>
          <input
            id={`${formId}-checkin`}
            name="checkIn"
            type="date"
            required
            min={todayIso}
            value={values.checkIn}
            onChange={(e) => {
              const val = e.target.value;
              setValues((prev) => ({ ...prev, checkIn: val }));
              if (errors.checkIn) {
                setErrors((prev) => ({ ...prev, checkIn: undefined }));
              }
            }}
            aria-invalid={Boolean(errors.checkIn)}
            aria-describedby={
              errors.checkIn ? `${formId}-checkin-err` : undefined
            }
            className={`${fieldClass} appearance-none tabular-nums`}
          />
          {errors.checkIn && (
            <p
              id={`${formId}-checkin-err`}
              role="alert"
              className="mt-2 text-sm font-medium text-[#14341F]"
            >
              {errors.checkIn}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor={`${formId}-checkout`}
            className="block text-sm font-medium text-[#122318] mb-2"
          >
            Check-out
          </label>
          <input
            id={`${formId}-checkout`}
            name="checkOut"
            type="date"
            required
            min={values.checkIn || todayIso}
            value={values.checkOut}
            onChange={(e) => {
              const val = e.target.value;
              setValues((prev) => ({ ...prev, checkOut: val }));
              if (errors.checkOut) {
                setErrors((prev) => ({ ...prev, checkOut: undefined }));
              }
            }}
            aria-invalid={Boolean(errors.checkOut)}
            aria-describedby={
              errors.checkOut ? `${formId}-checkout-err` : undefined
            }
            className={`${fieldClass} appearance-none tabular-nums`}
          />
          {errors.checkOut && (
            <p
              id={`${formId}-checkout-err`}
              role="alert"
              className="mt-2 text-sm font-medium text-[#14341F]"
            >
              {errors.checkOut}
            </p>
          )}
        </div>

        <div>
          <span
            id={`${formId}-guests-label`}
            className="block text-sm font-medium text-[#122318] mb-2"
          >
            Guests
          </span>
          <div
            role="group"
            aria-labelledby={`${formId}-guests-label`}
            className="flex h-12 min-h-[48px] items-center justify-between rounded-[16px] border border-[#14341F]/12 bg-[#F3F9F4]/65 px-1"
          >
            <button
              type="button"
              onClick={() => {
                setValues((prev) => ({
                  ...prev,
                  guests: Math.max(1, prev.guests - 1),
                }));
                if (errors.guests) {
                  setErrors((prev) => ({ ...prev, guests: undefined }));
                }
              }}
              disabled={values.guests <= 1}
              aria-label="Decrease guests"
              className="inline-flex min-w-[44px] h-10 items-center justify-center rounded-full text-[#122318] hover:bg-[#FFFFFF] disabled:opacity-35 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#14341F]"
            >
              <Minus size={16} strokeWidth={1.6} aria-hidden="true" />
            </button>
            <span
              aria-live="polite"
              className="text-base font-medium text-[#122318] tabular-nums"
            >
              {values.guests}
            </span>
            <button
              type="button"
              onClick={() => {
                setValues((prev) => ({
                  ...prev,
                  guests: Math.min(10, prev.guests + 1),
                }));
                if (errors.guests) {
                  setErrors((prev) => ({ ...prev, guests: undefined }));
                }
              }}
              disabled={values.guests >= 10}
              aria-label="Increase guests"
              className="inline-flex min-w-[44px] h-10 items-center justify-center rounded-full text-[#122318] hover:bg-[#FFFFFF] disabled:opacity-35 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#14341F]"
            >
              <Plus size={16} strokeWidth={1.6} aria-hidden="true" />
            </button>
          </div>
          {errors.guests && (
            <p
              id={`${formId}-guests-err`}
              role="alert"
              className="mt-2 text-sm font-medium text-[#14341F]"
            >
              {errors.guests}
            </p>
          )}
        </div>
      </div>

      {/* Optional Message */}
      <div>
        <label
          htmlFor={`${formId}-message`}
          className="block text-sm font-medium text-[#122318] mb-2"
        >
          Message (optional)
        </label>
        <textarea
          id={`${formId}-message`}
          name="message"
          rows={4}
          value={values.message}
          onChange={(e) =>
            setValues((prev) => ({ ...prev, message: e.target.value }))
          }
          placeholder="Room preference, arrival time, or local experience questions"
          className="w-full rounded-[16px] border border-[#14341F]/12 bg-[#F3F9F4]/65 px-4 py-3.5 text-base font-normal text-[#122318] placeholder:text-[#4A5D50]/75 focus:border-[#14341F] focus:bg-[#FFFFFF] focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-[#14341F] transition-colors duration-200"
        />
      </div>

      {/* Submit pill & note */}
      <div className="space-y-3 pt-2">
        <button
          type="submit"
          className="btn-primary-pill inline-flex w-full sm:w-auto min-h-[50px] items-center justify-center px-8 py-3 text-base font-medium whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#14341F]"
        >
          Send on WhatsApp
        </button>

        <p
          id={`${formId}-notice`}
          className="text-sm font-normal text-[#4A5D50]"
        >
          {siteConfig.contactSection.formNotice}
        </p>
      </div>
    </form>
  );
}
