import React, { useEffect, useMemo, useState } from "react";
import { sound } from "../utils/sound";

interface ContributionDay {
  date: string;
  count: number;
}

const GITHUB_USERNAME = "charlesdcayetano";

export const GithubGraph: React.FC = () => {
  const [contributions, setContributions] = useState<ContributionDay[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const fetchContributions = async () => {
      try {
        setLoading(true);
        setError(false);

        // Fetch directly from the public GitHub contribution API endpoint
        const response = await fetch(
          `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Verify JSON response content type before parsing
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new TypeError("Received non-JSON response from server");
        }

        const data = await response.json();

        const parsedDays: ContributionDay[] = [];

        // Handle direct GraphQL structure if routed through custom backend API
        if (data?.data?.user?.contributionsCollection?.contributionCalendar?.weeks) {
          data.data.user.contributionsCollection.contributionCalendar.weeks.forEach(
            (week: any) => {
              week.contributionDays.forEach((day: any) => {
                parsedDays.push({
                  date: day.date,
                  count: day.contributionCount,
                });
              });
            }
          );
        } else if (Array.isArray(data?.contributions)) {
          // Handle standard REST API response array
          data.contributions.forEach((day: any) => {
            parsedDays.push({
              date: day.date,
              count: day.count,
            });
          });
        } else {
          throw new Error("Invalid contribution data format received");
        }

        if (!cancelled) {
          setContributions(parsedDays);
        }
      } catch (err) {
        console.error("GitHub contribution error:", err);
        if (!cancelled) setError(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchContributions();

    return () => {
      cancelled = true;
    };
  }, []);

  const weeks = useMemo(() => {
    if (!contributions.length) return [];

    const sorted = [...contributions].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    const firstDate = new Date(`${sorted[0].date}T00:00:00`);
    const leadingEmptyDays = firstDate.getDay(); // 0 = Sunday

    const padded: ContributionDay[] = [];

    // Add empty placeholder days for grid offset alignment
    for (let i = 0; i < leadingEmptyDays; i++) {
      padded.push({ date: `padding-${i}`, count: 0 });
    }

    padded.push(...sorted);

    // Group items into 7-day week columns
    const grid: ContributionDay[][] = [];
    for (let i = 0; i < padded.length; i += 7) {
      grid.push(padded.slice(i, i + 7));
    }

    return grid;
  }, [contributions]);

  const maxContribution = useMemo(() => {
    if (!contributions.length) return 1;
    return Math.max(...contributions.map((day) => day.count), 1);
  }, [contributions]);

  const getContributionLevel = (count: number) => {
    if (count === 0) return 0;
    const percentage = count / maxContribution;
    if (percentage <= 0.25) return 1;
    if (percentage <= 0.5) return 2;
    if (percentage <= 0.75) return 3;
    return 4;
  };

  const getLevelClass = (level: number) => {
    switch (level) {
      case 1:
        return "fill-current opacity-20";
      case 2:
        return "fill-current opacity-40";
      case 3:
        return "fill-current opacity-65";
      case 4:
        return "fill-current opacity-95";
      default:
        return "fill-current opacity-[0.08]";
    }
  };

  const totalContributions = useMemo(() => {
    return contributions.reduce((total, day) => total + day.count, 0);
  }, [contributions]);

  return (
    <section id="github" className="border-t border-g200 py-12">
      <div className="mb-6 flex items-baseline justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="font-pixel text-xs text-g400">05 —</span>
          <h2 className="font-pixel text-sm text-g400">
            github contribution matrix
          </h2>
        </div>

        <a
          href={`https://github.com/${GITHUB_USERNAME}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => sound.play("tick")}
          className="font-mono text-[11px] uppercase tracking-wider text-g500 transition-colors hover:text-ink"
        >
          @{GITHUB_USERNAME} ↗
        </a>
      </div>

      <a
        href={`https://github.com/${GITHUB_USERNAME}`}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => sound.play("press")}
        className="group block overflow-hidden rounded-xl border border-g200 bg-g50/40 p-4 transition-colors hover:border-g300 sm:p-5"
      >
        {loading ? (
          <div className="flex min-h-[120px] items-center justify-center">
            <span className="font-mono text-[11px] uppercase tracking-wider text-g400">
              Loading contribution data...
            </span>
          </div>
        ) : error ? (
          <div className="flex min-h-[120px] flex-col items-center justify-center gap-2 text-center">
            <span className="font-mono text-[11px] uppercase tracking-wider text-g400">
              Unable to load GitHub activity
            </span>
            <span className="font-mono text-[10px] text-g500">
              View profile ↗
            </span>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto scrollbar-none">
              <svg
                viewBox={`0 0 ${Math.max(weeks.length * 13, 689)} 91`}
                className="h-auto w-full min-w-[689px] text-ink"
                preserveAspectRatio="xMidYMid meet"
                role="img"
                aria-label={`GitHub contribution graph for ${GITHUB_USERNAME}`}
              >
                {weeks.map((week, weekIndex) =>
                  week.map((day, dayIndex) => {
                    if (day.date.startsWith("padding")) return null;

                    const level = getContributionLevel(day.count);
                    const x = 2 + weekIndex * 13;
                    const y = 2 + dayIndex * 13;

                    return (
                      <rect
                        key={day.date}
                        x={x}
                        y={y}
                        width="9"
                        height="9"
                        rx="2"
                        className={`${getLevelClass(
                          level
                        )} transition-opacity duration-200 group-hover:opacity-100`}
                      >
                        <title>
                          {day.count} contribution
                          {day.count === 1 ? "" : "s"} on{" "}
                          {new Date(`${day.date}T00:00:00`).toLocaleDateString(
                            undefined,
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            }
                          )}
                        </title>
                      </rect>
                    );
                  })
                )}
              </svg>
            </div>

            <div className="mt-3 flex items-center justify-between border-t border-g200/50 pt-2">
              <div className="font-mono text-[11px] text-g400">
                {totalContributions.toLocaleString()} contributions in the last
                year
              </div>

              <div className="flex items-center gap-1.5 font-mono text-[11px] text-g400">
                <span>Less</span>
                <span className="h-2 w-2 rounded-sm bg-ink opacity-10" />
                <span className="h-2 w-2 rounded-sm bg-ink opacity-25" />
                <span className="h-2 w-2 rounded-sm bg-ink opacity-50" />
                <span className="h-2 w-2 rounded-sm bg-ink opacity-75" />
                <span className="h-2 w-2 rounded-sm bg-ink opacity-95" />
                <span>More</span>
              </div>
            </div>
          </>
        )}
      </a>
    </section>
  );
};