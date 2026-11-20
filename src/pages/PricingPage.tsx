import { type FormEvent, useId, useMemo, useState } from 'react';
import { MediaSlot } from '../components/MediaSlot';
import { Reveal } from '../components/Reveal';
import { getRoomPastelClass } from '../components/StayCard';
import { buildWhatsAppUrl, RoomConfig, siteConfig } from '../config/site';

function formatInr(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`;
}

function calculateNights(checkIn: string, checkOut: string): number {
  if (!checkIn || !checkOut) return 0;
  const [y1, m1, d1] = checkIn.split('-').map(Number);
  const [y2, m2, d2] = checkOut.split('-').map(Number);
  if (!y1 || !m1 || !d1 || !y2 || !m2 || !d2) return 0;
  const start = Date.UTC(y1, m1 - 1, d1);
  const end = Date.UTC(y2, m2 - 1, d2);
  const days = Math.round((end - start) / (1000 * 60 * 60 * 24));
  return days > 0 ? days : 0;
}

const ROOM_GROUPS: ReadonlyArray<{
  id: RoomConfig['rateGroup'];
  title: string;
}> = [
  { id: 'non-ac', title: 'Non-AC rooms' },
  { id: 'ac', title: 'AC rooms' },
  { id: 'family', title: 'Family rooms' },
];

export function PricingPage() {
  const formId = useId();
  const { guestInfo, phones, pricingSection, staySection } = siteConfig;
  const primaryPhone = phones[0];
  const extraBed = pricingSection.addOns[0];

  const groupedRooms = useMemo(() => {
    return ROOM_GROUPS.map((group) => ({
      ...group,
      rooms: staySection.rooms
        .filter((room) => room.rateGroup === group.id)
        .sort((a, b) => a.priceNumber - b.priceNumber),
    })).filter((group) => group.rooms.length > 0);
  }, [staySection.rooms]);

  const orderedRooms = useMemo(
    () => groupedRooms.flatMap((group) => group.rooms),
    [groupedRooms],
  );

  const [selectedRoomId, setSelectedRoomId] = useState<string>(
    orderedRooms[0]?.id ?? '',
  );
  const [checkIn, setCheckIn] = useState<string>('');
  const [checkOut, setCheckOut] = useState<string>('');
  const [guests, setGuests] = useState<string>('2');
  const [errors, setErrors] = useState<{
    checkIn?: string;
    checkOut?: string;
    guests?: string;
  }>({});
  const [readyWaUrl, setReadyWaUrl] = useState<string>('');

  const selectedRoom = useMemo(
    () =>
      orderedRooms.find((room) => room.id === selectedRoomId) ?? orderedRooms[0],
    [orderedRooms, selectedRoomId],
  );

  const nights = calculateNights(checkIn, checkOut);
  const guestCount = Number(guests);
  const estimatedTotal =
    selectedRoom && nights > 0 ? selectedRoom.priceNumber * nights : 0;

  const hasDateOrderError = Boolean(checkIn && checkOut && checkOut <= checkIn);
  const hasCheckInOutTimes = Boolean(
    guestInfo.checkInTime && guestInfo.checkOutTime,
  );

  const todayIso = new Date().toISOString().split('T')[0];

  const composeEstimateWhatsApp = (): string => {
    if (!selectedRoom) return siteConfig.hero.whatsappPrefill;
    return [
      "Hi, I'd like to ask about availability at Samco Residency.",
      `Room: ${selectedRoom.name} (${formatInr(selectedRoom.priceNumber)} per night)`,
      `Check-in: ${checkIn}`,
      `Check-out: ${checkOut}`,
      `Nights: ${nights}`,
      `Guests: ${guests}`,
      `Estimated room total: ${formatInr(estimatedTotal)}`,
    ].join('\n');
  };

  const handleEstimatorSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors: {
      checkIn?: string;
      checkOut?: string;
      guests?: string;
    } = {};

    if (!checkIn) {
      nextErrors.checkIn = 'Choose a check-in date.';
    }
    if (!checkOut) {
      nextErrors.checkOut = 'Choose a check-out date.';
    } else if (checkIn && checkOut <= checkIn) {
      nextErrors.checkOut = 'Check-out must be after check-in.';
    }

    if (!guests || Number.isNaN(guestCount) || guestCount < 1) {
      nextErrors.guests = 'Enter at least 1 guest.';
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0 || nights < 1) {
      setReadyWaUrl('');
      return;
    }

    const waUrl = buildWhatsAppUrl(composeEstimateWhatsApp());
    setReadyWaUrl(waUrl);

    const anchor = document.createElement('a');
    anchor.href = waUrl;
    anchor.target = '_blank';
    anchor.rel = 'noopener noreferrer';
    anchor.click();
  };

  const fieldClass =
    'w-full h-12 min-h-[48px] rounded-[16px] border border-[#14341F]/12 bg-[#F3F9F4]/65 px-4 text-base font-sans text-[#122318] focus:border-[#14341F] focus:bg-[#FFFFFF] focus:outline-none transition-colors duration-200';

  return (
    <div className="relative pt-28 pb-20 sm:pt-36 sm:pb-24 overflow-x-clip">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 h-[380px] w-[min(92vw,760px)] rounded-full blur-[110px] opacity-70"
        style={{ background: 'var(--color-glow-green)' }}
      />

      <div className="relative z-10 mx-auto max-w-[1160px] px-4 sm:px-8">
        {/* Top: calm headline, what rates cover, and shared inclusions */}
        <header className="max-w-[680px] mb-12 sm:mb-14">
          <h1 className="text-[clamp(2.25rem,4.8vw,3.75rem)] leading-[1.08] tracking-[-0.015em] text-[#122318] mb-3">
            {pricingSection.heading}
          </h1>
          <p className="text-base sm:text-[17px] text-[#4A5D50] leading-[1.6] mb-3">
            {pricingSection.lead}
          </p>
          <p className="inline-flex items-center rounded-full bg-[#FBFDFB] border border-[#FFFFFF]/90 px-4 py-2 text-sm sm:text-base font-medium text-[#122318] shadow-[var(--shadow-glass)]">
            {pricingSection.includedEveryRoom}
          </p>
        </header>

        {/* Room groups ordered cheapest to most expensive inside soft pastel-washed 32px cards */}
        <div className="space-y-14 sm:space-y-16">
          {groupedRooms.map((group) => (
            <section key={group.id} aria-labelledby={`group-${group.id}`}>
              <h2
                id={`group-${group.id}`}
                className="text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.15] text-[#122318] mb-6"
              >
                {group.title}
              </h2>

              <div className="space-y-5">
                {group.rooms.map((room, idx) => {
                  const leadImage = room.images[0];
                  const pastelClass = getRoomPastelClass(room.rateGroup);
                  const roomSentence = room.capacity
                    ? `${room.shortSummary} ${room.capacity}.`
                    : room.shortSummary;

                  return (
                    <Reveal key={room.id} delayMs={idx * 60}>
                      <article className="retreat-card-interactive grid grid-cols-1 md:grid-cols-[200px_1fr_176px_auto] gap-5 md:gap-7 items-start md:items-center p-4 sm:p-5">
                        <div className={`${pastelClass} rounded-[26px] p-2`}>
                          {leadImage ? (
                            <MediaSlot
                              asset={leadImage}
                              aspectClass="aspect-[4/3]"
                            />
                          ) : null}
                        </div>

                        <div className="px-1 md:px-0">
                          <h3 className="text-lg sm:text-xl font-semibold tracking-[-0.02em] text-[#122318] leading-[1.3]">
                            {room.name}
                          </h3>
                          <p className="mt-1.5 text-sm sm:text-base text-[#4A5D50] leading-[1.6]">
                            {roomSentence}
                          </p>
                        </div>

                        <div className="px-1 md:px-0 md:text-right">
                          <p className="text-lg sm:text-xl font-semibold text-[#122318] tabular-nums whitespace-nowrap">
                            {formatInr(room.priceNumber)}{' '}
                            <span className="text-sm font-normal text-[#4A5D50]">
                              per night
                            </span>
                          </p>
                          {room.peakPriceNumber ? (
                            <p className="mt-0.5 text-sm text-[#4A5D50] tabular-nums whitespace-nowrap">
                              {formatInr(room.peakPriceNumber)} in peak season
                            </p>
                          ) : null}
                        </div>

                        <div className="w-full md:w-auto">
                          <a
                            href={buildWhatsAppUrl(
                              `Hi, I'd like to ask about the ${room.name} at Samco Residency.`,
                            )}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary-pill inline-flex w-full md:w-auto min-h-[46px] items-center justify-center px-6 py-2.5 text-sm font-medium whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#14341F]"
                          >
                            Ask about this room
                          </a>
                        </div>
                      </article>
                    </Reveal>
                  );
                })}
              </div>
            </section>
          ))}
        </div>

        {/* Compact Stay Estimator Card */}
        <Reveal className="mt-16 sm:mt-20 max-w-[760px]">
          <section
            aria-labelledby="estimator-heading"
            className="retreat-card p-7 sm:p-9"
          >
            <h2
              id="estimator-heading"
              className="text-[clamp(1.75rem,3vw,2.35rem)] leading-[1.15] text-[#122318] mb-2"
            >
              Estimate your stay
            </h2>
            <p className="text-base text-[#4A5D50] leading-[1.6] mb-6">
              Pick a room, dates, and guest count for one room to see the room
              total.
            </p>

            <form
              onSubmit={handleEstimatorSubmit}
              noValidate
              className="space-y-5"
            >
              <div>
                <label
                  htmlFor={`${formId}-room`}
                  className="block text-sm font-medium text-[#122318] mb-2"
                >
                  Room
                </label>
                <select
                  id={`${formId}-room`}
                  value={selectedRoom?.id ?? ''}
                  onChange={(e) => {
                    setSelectedRoomId(e.target.value);
                    setReadyWaUrl('');
                  }}
                  className={fieldClass}
                >
                  {orderedRooms.map((room) => (
                    <option key={room.id} value={room.id}>
                      {room.name} — {formatInr(room.priceNumber)} per night
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div>
                  <label
                    htmlFor={`${formId}-checkin`}
                    className="block text-sm font-medium text-[#122318] mb-2"
                  >
                    Check-in
                  </label>
                  <input
                    id={`${formId}-checkin`}
                    type="date"
                    min={todayIso}
                    value={checkIn}
                    onChange={(e) => {
                      setCheckIn(e.target.value);
                      setReadyWaUrl('');
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
                      className="mt-1.5 text-sm font-medium text-[#14341F]"
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
                    type="date"
                    min={checkIn || todayIso}
                    value={checkOut}
                    onChange={(e) => {
                      setCheckOut(e.target.value);
                      setReadyWaUrl('');
                      if (errors.checkOut) {
                        setErrors((prev) => ({ ...prev, checkOut: undefined }));
                      }
                    }}
                    aria-invalid={Boolean(errors.checkOut || hasDateOrderError)}
                    aria-describedby={
                      errors.checkOut ? `${formId}-checkout-err` : undefined
                    }
                    className={`${fieldClass} appearance-none tabular-nums`}
                  />
                  {errors.checkOut && (
                    <p
                      id={`${formId}-checkout-err`}
                      className="mt-1.5 text-sm font-medium text-[#14341F]"
                    >
                      {errors.checkOut}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor={`${formId}-guests`}
                    className="block text-sm font-medium text-[#122318] mb-2"
                  >
                    Guests
                  </label>
                  <input
                    id={`${formId}-guests`}
                    type="number"
                    min={1}
                    max={30}
                    value={guests}
                    onChange={(e) => {
                      setGuests(e.target.value);
                      setReadyWaUrl('');
                      if (errors.guests) {
                        setErrors((prev) => ({ ...prev, guests: undefined }));
                      }
                    }}
                    aria-invalid={Boolean(errors.guests)}
                    aria-describedby={
                      errors.guests ? `${formId}-guests-err` : undefined
                    }
                    className={`${fieldClass} tabular-nums`}
                  />
                  {errors.guests && (
                    <p
                      id={`${formId}-guests-err`}
                      className="mt-1.5 text-sm font-medium text-[#14341F]"
                    >
                      {errors.guests}
                    </p>
                  )}
                </div>
              </div>

              <div className="rounded-2xl pastel-sage p-4 sm:p-5">
                {selectedRoom && nights > 0 ? (
                  <div className="space-y-1">
                    <p className="text-xl font-semibold text-[#122318] tabular-nums">
                      Total: {formatInr(estimatedTotal)}
                    </p>
                    <p className="text-sm sm:text-base text-[#4A5D50] tabular-nums">
                      {selectedRoom.name}, {nights}{' '}
                      {nights === 1 ? 'night' : 'nights'} at{' '}
                      {formatInr(selectedRoom.priceNumber)} per night.
                    </p>
                  </div>
                ) : hasDateOrderError ? (
                  <p className="text-base font-medium text-[#14341F]">
                    Check-out must be after check-in.
                  </p>
                ) : selectedRoom ? (
                  <p className="text-sm sm:text-base text-[#4A5D50] tabular-nums">
                    {selectedRoom.name} is {formatInr(selectedRoom.priceNumber)}{' '}
                    per night. Choose check-in and check-out dates to see the
                    total.
                  </p>
                ) : null}
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-1">
                <button
                  type="submit"
                  className="btn-primary-pill inline-flex w-full sm:w-auto min-h-[50px] items-center justify-center px-7 py-3 text-base font-medium whitespace-nowrap"
                >
                  Send this on WhatsApp
                </button>

                {readyWaUrl && (
                  <a
                    href={readyWaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[44px] items-center text-base font-medium text-[#14341F] underline underline-offset-4"
                  >
                    Open WhatsApp
                  </a>
                )}
              </div>
            </form>
          </section>
        </Reveal>

        {/* Good to know notes in 16px body text */}
        <Reveal className="mt-8 max-w-[760px]">
          <section
            aria-labelledby="pricing-notes-heading"
            className="retreat-card p-7 sm:p-9 space-y-3 text-base text-[#4A5D50] leading-[1.6]"
          >
            <h2
              id="pricing-notes-heading"
              className="text-2xl text-[#122318] mb-3"
            >
              Good to know
            </h2>

            {extraBed && (
              <p className="tabular-nums text-[#122318]">
                Extra bed and bedding is {formatInr(extraBed.price)} per night
                and includes 1 extra bed, 1 pillow, and 1 blanket.
              </p>
            )}

            {pricingSection.extraPersonNote && (
              <p>{pricingSection.extraPersonNote}</p>
            )}

            {pricingSection.childPolicy && <p>{pricingSection.childPolicy}</p>}

            {pricingSection.taxNote && <p>{pricingSection.taxNote}</p>}

            {pricingSection.peakSeasonDates && (
              <p>{pricingSection.peakSeasonDates}</p>
            )}

            {hasCheckInOutTimes && (
              <p>
                Check-in is at {guestInfo.checkInTime} and check-out is at{' '}
                {guestInfo.checkOutTime}.
              </p>
            )}

            {primaryPhone && (
              <p>
                Need more than one room or booking for a group? Call{' '}
                <a
                  href={`tel:${primaryPhone.e164}`}
                  className="font-medium text-[#14341F] underline underline-offset-4 tabular-nums"
                >
                  +91 {primaryPhone.display}
                </a>
                .
              </p>
            )}
          </section>
        </Reveal>
      </div>
    </div>
  );
}
