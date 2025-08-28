import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

/**
 * Props:
 * - open (bool) - show/hide wrapper if you use modal
 * - onApply({ date: { start, end }, ranges }) - date.start/end = YYYY-MM-DD, ranges = [{ start: ISO, end: ISO }]
 * - onClose()
 * - initialDate (optional) - either a single date string or { start: string, end: string }
 */
export default function DateTimePicker({ open, onApply, onClose, initialDate = null }) {
  // dateRange = [startDate, endDate]
  const parseInitialRange = () => {
    if (initialDate && initialDate.start && initialDate.end) {
      return [new Date(initialDate.start), new Date(initialDate.end)];
    }
    if (initialDate) {
      const d = new Date(initialDate);
      return [d, d];
    }
    const today = new Date();
    return [today, today];
  };

  const [dateRange, setDateRange] = useState(parseInitialRange);

  // helper to create a Date at base day with given time (immutable)
  const dayWithTime = (baseDay, hours = 9, minutes = 0) => {
    const d = new Date(baseDay || new Date());
    d.setHours(hours, minutes, 0, 0);
    return d;
  };

  // time ranges (per selection) — keep times relative to start date for normalization
  const [ranges, setRanges] = useState(() => {
    const base = dateRange[0] || new Date();
    return [{ start: dayWithTime(base, 9, 0), end: dayWithTime(base, 11, 0) }];
  });

  const updateRange = (idx, key, value) => {
    setRanges((prev) => {
      const next = [...prev];
      next[idx] = { ...next[idx], [key]: value };
      return next;
    });
  };

  const addRange = () => {
    const base = dateRange[0] || new Date();
    setRanges((r) => [...r, { start: dayWithTime(base, 9, 0), end: dayWithTime(base, 10, 0) }]);
  };

  const removeRange = (idx) => setRanges((r) => r.filter((_, i) => i !== idx));

  const handleApply = () => {
    const startDate = dateRange[0] || new Date();
    const endDate = dateRange[1] || startDate;

    // compute full-day difference (end - start) in days (integer)
    const msPerDay = 24 * 60 * 60 * 1000;
    const startDay = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
    const endDay = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());
    const days = Math.max(0, Math.round((endDay - startDay) / msPerDay));

    // combine startDate with each range's start time, and endDate with each range's end time
    const normalized = ranges.map((rg) => ({
      start: new Date(
        startDate.getFullYear(),
        startDate.getMonth(),
        startDate.getDate(),
        rg.start.getHours(),
        rg.start.getMinutes()
      ).toISOString(),
      end: new Date(
        endDate.getFullYear(),
        endDate.getMonth(),
        endDate.getDate(),
        rg.end.getHours(),
        rg.end.getMinutes()
      ).toISOString(),
    }));

    const payload = {
      date: {
        start: startDate ? startDate.toISOString().slice(0, 10) : null,
        end: endDate ? endDate.toISOString().slice(0, 10) : null,
      },
      ranges: normalized,
      days, // integer number of days between start and end (e.g. 27 -> 29 === 2)
    };

    console.log("DateTimePicker apply payload:", payload);

    onApply?.(payload);
    onClose?.();
  };

  if (!open) return null;

  const formatDateLabel = (d) => (d ? d.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" }) : "-");

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black bg-opacity-30 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-t-xl sm:rounded-xl shadow-xl w-full max-w-lg overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* header */}
        <div className="flex items-center justify-between px-5 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-800">Select Normal Delivery Date & Time</h3>
          <button
            aria-label="Close"
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M6 6L18 18M6 18L18 6" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* body */}
        <div className="px-4 py-5">
          <div className="mb-4">
            <div className="rounded-lg border bg-white p-4 shadow-sm">
              <DatePicker
                selected={dateRange[0]}
                onChange={(dates) => {
                  // dates will be [start, end] when selectsRange — handle single date too
                  if (Array.isArray(dates)) setDateRange(dates);
                  else setDateRange([dates, dates]);
                }}
                startDate={dateRange[0]}
                endDate={dateRange[1]}
                selectsRange
                inline
                calendarClassName="react-datepicker-custom"
              />
            </div>

            <div className="mt-3 text-sm text-gray-600 flex items-center gap-2">
              <span className="font-medium text-gray-700">Selected:</span>
              <span className="px-3 py-1 bg-gray-100 rounded text-gray-800">{formatDateLabel(dateRange[0])}</span>
              <span className="text-gray-400">—</span>
              <span className="px-3 py-1 bg-gray-100 rounded text-gray-800">{formatDateLabel(dateRange[1])}</span>
            </div>
          </div>

          {/* time box */}
          <div className="bg-gray-50 rounded-lg p-4">
            <label className="block text-sm text-gray-700 mb-3">Specify Time?</label>

            {ranges.map((rg, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 mb-3 bg-white border rounded-md p-2"
              >
                <div className="flex items-center justify-center gap-2">
                  <DatePicker
                    selected={rg.start}
                    onChange={(d) => updateRange(idx, "start", d)}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={15}
                    timeCaption="Start"
                    dateFormat="h:mm aa"
                    className="px-3 py-2 text-sm rounded-md border focus:outline-none"
                  />
                  <span className="text-sm text-gray-400">—</span>
                  <DatePicker
                    selected={rg.end}
                    onChange={(d) => updateRange(idx, "end", d)}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={15}
                    timeCaption="End"
                    dateFormat="h:mm aa"
                    className="px-3 py-2 text-sm rounded-md border focus:outline-none"
                  />
                </div>

                <div className="ml-auto flex items-center gap-2">
                  <button
                    title="Remove"
                    onClick={() => removeRange(idx)}
                    className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-red-500"
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}

            <div className="flex items-center justify-between mt-2">
              <button
                type="button"
                onClick={addRange}
                className="flex items-center gap-2 text-sm text-blue-600 hover:underline"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M12 5v14M5 12h14" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Add
              </button>

              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-white border rounded-md text-sm hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleApply}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm shadow"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* footer spacer for mobile */}
        <div className="h-3 sm:hidden" />
      </div>
    </div>
  );
}