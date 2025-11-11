export default function generateEventId(ev, idx = 0) {
  return (
    `${ev.originCompetitionId ?? "user-events"}-` +
    `${ev.stage?.id ?? "NA"}-` +
    `${ev.homeTeam?.slug ?? "home"}-` +
    `${ev.awayTeam?.slug ?? "away"}-` +
    `${ev.dateVenue ?? "TBD"}-${idx}`
  );
}
