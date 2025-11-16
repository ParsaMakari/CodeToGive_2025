import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Clock, MapPin } from "lucide-react";
import "../css/EventsCalendar.scss";

function buildKey(date) {
    // yyyy-mm-dd
    return date.toISOString().slice(0, 10);
}

function EventsCalendar({ events = [] }) {
    const { t, i18n } = useTranslation();

    const today = new Date();
    const [currentMonth, setCurrentMonth] = useState(
        new Date(today.getFullYear(), today.getMonth(), 1)
    );
    const [selectedDate, setSelectedDate] = useState(today);

    // Group events by date key
    const eventsByDay = useMemo(() => {
        const map = {};
        events.forEach((evt) => {
            // expect evt.date as "YYYY-MM-DD"
            const key = evt.date;
            if (!map[key]) map[key] = [];
            map[key].push(evt);
        });
        return map;
    }, [events]);

    // Localized month label
    const monthLabel = currentMonth.toLocaleDateString(i18n.language, {
        month: "long",
        year: "numeric",
    });

    // Localized weekday headers (short names)
    const weekdayLabels = useMemo(() => {
        // Start from a known Sunday: 2021-08-01
        const base = new Date(2021, 7, 1);
        const formatter = new Intl.DateTimeFormat(i18n.language, {
            weekday: "short",
        });
        return Array.from({ length: 7 }, (_, i) =>
            formatter.format(new Date(base.getTime() + i * 24 * 60 * 60 * 1000))
        );
    }, [i18n.language]);

    const firstDayOfMonth = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth(),
        1
    );
    const firstWeekday = firstDayOfMonth.getDay(); // 0 = Sunday
    const daysInMonth = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth() + 1,
        0
    ).getDate();

    const handlePrevMonth = () => {
        setCurrentMonth(
            (prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1)
        );
    };

    const handleNextMonth = () => {
        setCurrentMonth(
            (prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1)
        );
    };

    const handleSelectDay = (day) => {
        const d = new Date(
            currentMonth.getFullYear(),
            currentMonth.getMonth(),
            day
        );
        setSelectedDate(d);
    };

    const isSameDay = (d1, d2) =>
        d1.getFullYear() === d2.getFullYear() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getDate() === d2.getDate();

    const selectedKey = buildKey(selectedDate);
    const selectedEvents = eventsByDay[selectedKey] || [];

    // Build calendar cells
    const weeks = [];
    let currentDay = 1;
    const totalCells = Math.ceil((firstWeekday + daysInMonth) / 7) * 7;

    for (let i = 0; i < totalCells; i++) {
        const weekIndex = Math.floor(i / 7);
        if (!weeks[weekIndex]) weeks[weekIndex] = [];

        if (i < firstWeekday || currentDay > daysInMonth) {
            weeks[weekIndex].push(null);
        } else {
            weeks[weekIndex].push(currentDay);
            currentDay++;
        }
    }

    const selectedDateLabel = selectedDate.toLocaleDateString(i18n.language, {
        weekday: "long",
        month: "short",
        day: "numeric",
    });

    return (
        <section className="events-calendar">
            <header className="events-calendar__header">
                <div className="events-calendar__title-block">
          <span className="events-calendar__pill">
            {t("eventsCalendar.pill")}
          </span>
                    <h2 className="events-calendar__title">
                        {t("eventsCalendar.title")}
                    </h2>
                    <p className="events-calendar__subtitle">
                        {t("eventsCalendar.subtitle")}
                    </p>
                </div>

                <div className="events-calendar__month-switcher">
                    <button
                        type="button"
                        className="events-calendar__nav-btn"
                        onClick={handlePrevMonth}
                        aria-label={t("eventsCalendar.prevMonth")}
                    >
                        ‹
                    </button>
                    <span className="events-calendar__month-label">{monthLabel}</span>
                    <button
                        type="button"
                        className="events-calendar__nav-btn"
                        onClick={handleNextMonth}
                        aria-label={t("eventsCalendar.nextMonth")}
                    >
                        ›
                    </button>
                </div>
            </header>

            <div className="events-calendar__content">
                <div className="events-calendar__grid-card">
                    <div className="events-calendar__weekdays">
                        {weekdayLabels.map((d) => (
                            <span key={d} className="events-calendar__weekday">
                {d}
              </span>
                        ))}
                    </div>

                    <div className="events-calendar__grid">
                        {weeks.map((week, wi) => (
                            <div key={wi} className="events-calendar__week-row">
                                {week.map((day, di) => {
                                    if (day === null) {
                                        return (
                                            <div
                                                key={di}
                                                className="events-calendar__day events-calendar__day--empty"
                                            />
                                        );
                                    }
                                    const cellDate = new Date(
                                        currentMonth.getFullYear(),
                                        currentMonth.getMonth(),
                                        day
                                    );
                                    const key = buildKey(cellDate);
                                    const hasEvents = !!eventsByDay[key];
                                    const isToday = isSameDay(cellDate, today);
                                    const isSelected = isSameDay(cellDate, selectedDate);

                                    return (
                                        <button
                                            key={di}
                                            type="button"
                                            className={[
                                                "events-calendar__day",
                                                isToday ? "events-calendar__day--today" : "",
                                                isSelected ? "events-calendar__day--selected" : "",
                                                hasEvents ? "events-calendar__day--has-events" : "",
                                            ]
                                                .filter(Boolean)
                                                .join(" ")}
                                            onClick={() => handleSelectDay(day)}
                                        >
                      <span className="events-calendar__day-number">
                        {day}
                      </span>
                                            {hasEvents && (
                                                <span className="events-calendar__event-dot" />
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        ))}
                    </div>
                </div>

                <aside className="events-calendar__sidebar">
                    <h3 className="events-calendar__sidebar-title">
                        {selectedDateLabel}
                    </h3>

                    {selectedEvents.length === 0 ? (
                        <p className="events-calendar__empty">
                            {t("eventsCalendar.empty")}
                        </p>
                    ) : (
                        <ul className="events-calendar__event-list">
                            {selectedEvents.map((evt) => (
                                <li
                                    key={evt.id || evt.title + evt.date}
                                    className="events-calendar__event"
                                >
                                    {evt.type && (
                                        <div className="events-calendar__event-tag">
                                            {/* If you later add type keys to i18n, map here, else fallback */}
                                            {t(
                                                `eventsCalendar.types.${evt.type}`,
                                                evt.type // fallback
                                            )}
                                        </div>
                                    )}
                                    <h4 className="events-calendar__event-title">
                                        {evt.title}
                                    </h4>
                                    {evt.time && (
                                        <p className="events-calendar__event-meta">
                                            <Clock size={14} aria-hidden="true" className="events-calendar__icon" /> {evt.time}
                                        </p>
                                    )}
                                    {evt.location && (
                                        <p className="events-calendar__event-meta">
                                            <MapPin size={14} aria-hidden="true" className="events-calendar__icon" /> {evt.location}
                                        </p>
                                    )}
                                    {evt.description && (
                                        <p className="events-calendar__event-description">
                                            {evt.description}
                                        </p>
                                    )}
                                </li>
                            ))}
                        </ul>
                    )}
                </aside>
            </div>
        </section>
    );
}

export default EventsCalendar;
