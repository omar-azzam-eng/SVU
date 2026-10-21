import { EVENTS } from './event-details.js';
import { escapeHtml } from '../utils/sanitize.js';

const MONTH_NAMES = { '10': 'تشرين الأول', '11': 'تشرين الثاني' };

const getDateParts = (dateValue) => {
  const [, month, day] = dateValue.split('-');
  return { day, month: MONTH_NAMES[month] || month };
};

export const renderEventCard = (eventId, event) => {
  const dateParts = getDateParts(event.dateValue);
  const imageClass = `event-image-${event.badgeClass.replace('badge-soft-', '')}`;
  return `<div class="col-md-6 col-xl-4 event-item" data-category="${escapeHtml(event.filterCategory)}" data-date="${escapeHtml(event.dateValue)}" data-location="${escapeHtml(event.locationKey)}" data-search="${escapeHtml(`${event.title} ${event.shortDescription} ${event.category} ${event.location}`)}"><article class="event-card"><div class="event-image ${imageClass}" role="img" aria-label="${escapeHtml(event.title)}"><span class="event-date"><strong>${escapeHtml(dateParts.day)}</strong>${escapeHtml(dateParts.month)}</span><span class="event-icon"><i class="bi bi-${escapeHtml(event.icon)}"></i></span></div><div class="event-body"><div class="d-flex justify-content-between align-items-center mb-3"><span class="badge ${escapeHtml(event.badgeClass)}">${escapeHtml(event.category)}</span><span class="event-time"><i class="bi bi-clock"></i> ${escapeHtml(event.time)}</span></div><h3>${escapeHtml(event.title)}</h3><p>${escapeHtml(event.shortDescription)}</p><div class="event-meta"><span><i class="bi bi-${event.locationKey === 'online' ? 'laptop' : 'geo-alt'}"></i> ${escapeHtml(event.location)}</span><a href="event.html?id=${encodeURIComponent(eventId)}" aria-label="تفاصيل ${escapeHtml(event.title)}"><i class="bi bi-arrow-up-left"></i></a></div></div></article></div>`;
};

export const renderEventsGrid = (eventIds = Object.keys(EVENTS)) => {
  const grid = document.querySelector('#events-grid');
  if (!grid) return;
  grid.innerHTML = eventIds.map((eventId) => renderEventCard(eventId, EVENTS[eventId])).join('');
};

export const renderFeaturedEvents = () => {
  const grid = document.querySelector('#featured-events-grid');
  if (!grid) return;
  grid.innerHTML = Object.entries(EVENTS).slice(0, 3).map(([eventId, event]) => renderEventCard(eventId, event)).join('');
};
