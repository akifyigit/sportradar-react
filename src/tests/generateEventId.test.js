import generateEventId from "../utils/generateEventId";

describe("generateEventId", () => {
  it("should generate correct id when all fields are present", () => {
    const ev = {
      originCompetitionId: "comp123",
      stage: { id: "stage45" },
      homeTeam: { slug: "teamA" },
      awayTeam: { slug: "teamB" },
      dateVenue: "2025-01-01",
    };

    const id = generateEventId(ev, 2);
    expect(id).toBe("comp123-stage45-teamA-teamB-2025-01-01-2");
  });

  it("should fallback to 'user-events' when originCompetitionId is missing", () => {
    const ev = {
      stage: { id: "stage1" },
      homeTeam: { slug: "home" },
      awayTeam: { slug: "away" },
      dateVenue: "2025-01-01",
    };

    expect(generateEventId(ev)).toMatch(/^user-events-/);
  });

  it("should fallback to 'NA' when stage.id is missing", () => {
    const ev = {
      originCompetitionId: "comp",
      stage: {},
      homeTeam: { slug: "teamA" },
      awayTeam: { slug: "teamB" },
      dateVenue: "2025-01-01",
    };

    const id = generateEventId(ev);
    expect(id.startsWith("comp-NA-")).toBe(true);
  });

  it("should fallback to 'home' when homeTeam.slug is missing", () => {
    const ev = {
      originCompetitionId: "comp",
      stage: { id: "stage" },
      homeTeam: {},
      awayTeam: { slug: "teamB" },
      dateVenue: "2025-01-01",
    };

    const id = generateEventId(ev);
    expect(id.includes("-home-")).toBe(true);
  });

  it("should fallback to 'away' when awayTeam.slug is missing", () => {
    const ev = {
      originCompetitionId: "comp",
      stage: { id: "stage" },
      homeTeam: { slug: "teamA" },
      awayTeam: {},
      dateVenue: "2025-01-01",
    };

    const id = generateEventId(ev);
    expect(id.includes("-away-")).toBe(true);
  });

  it("should fallback to 'TBD' when dateVenue is missing", () => {
    const ev = {
      originCompetitionId: "comp",
      stage: { id: "stage" },
      homeTeam: { slug: "teamA" },
      awayTeam: { slug: "teamB" },
    };

    const id = generateEventId(ev);
    expect(id.includes("-TBD-")).toBe(true);
  });

  it("should append the provided idx correctly", () => {
    const ev = {
      originCompetitionId: "comp",
      stage: { id: "stage" },
      homeTeam: { slug: "teamA" },
      awayTeam: { slug: "teamB" },
      dateVenue: "2025-01-01",
    };

    const id = generateEventId(ev, 5);
    expect(id.endsWith("-5")).toBe(true);
  });

  it("should default idx to 0", () => {
    const ev = {
      originCompetitionId: "comp",
      stage: { id: "stage" },
      homeTeam: { slug: "teamA" },
      awayTeam: { slug: "teamB" },
      dateVenue: "2025-01-01",
    };

    const id = generateEventId(ev);
    expect(id.endsWith("-0")).toBe(true);
  });
});
