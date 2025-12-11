"use client";

import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SectionTitle from "@/components/SectionTitle";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const GITHUB_USERNAME = "GojurJeevan";

type Stats = {
  repos: number;
  stars: number;
  followers: number;
  contributions: number;
};

type ContributionMonth = {
  month: string;
  contributions: number;
};

type LanguageDatum = {
  name: string;
  value: number;
  color: string;
};

export default function GitHubStats() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const isDark = mounted && resolvedTheme === "dark";

  const [stats, setStats] = useState<Stats>({
    repos: 0,
    stars: 0,
    followers: 0,
    contributions: 0,
  });

  const [contributionData, setContributionData] = useState<ContributionMonth[]>(
    []
  );
  const [languageData, setLanguageData] = useState<LanguageDatum[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    fetchGitHubData();
  }, []);

  async function fetchGitHubData() {
    try {
      setLoading(true);
      setError(null);

      // ---------- PROFILE ----------
      const profileRes = await fetch(
        `https://api.github.com/users/${GITHUB_USERNAME}`
      );
      const profile = await profileRes.json();

      // ---------- REPOS ----------
      const reposRes = await fetch(
        `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=200`
      );
      const repos = await reposRes.json();

      let stars = 0;
      const langTotals: Record<string, number> = {};

      repos.forEach((repo: any) => {
        stars += repo.stargazers_count;
        if (repo.language) {
          langTotals[repo.language] = (langTotals[repo.language] || 0) + 1;
        }
      });

      const languageDataset: LanguageDatum[] = Object.entries(langTotals).map(
        ([name, value]) => ({
          name,
          value,
          color:
            {
              JavaScript: "#f7df1e",
              TypeScript: "#3178c6",
              HTML: "#e34c26",
              CSS: "#264de4",
              Java: "#b07219",
              Python: "#3572A5",
            }[name] || "#8e8e8e",
        })
      );

      const query = `
        query {
          user(login: "${GITHUB_USERNAME}") {
            contributionsCollection {
              contributionCalendar {
                totalContributions
                weeks {
                  contributionDays {
                    date
                    contributionCount
                  }
                }
              }
            }
          }
        }
      `;

      const graphRes = await fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
        },
        body: JSON.stringify({ query }),
      });

      const graphData = await graphRes.json();

      const calendar =
        graphData?.data?.user?.contributionsCollection?.contributionCalendar;

      const contributionsTotal = calendar?.totalContributions ?? 0;

      const days = calendar?.weeks
        ?.flatMap((w: any) => w.contributionDays)
        ?.map((d: any) => ({
          date: d.date,
          count: d.contributionCount,
        }));

      const monthMap: Record<string, number> = {};

      days.forEach((day: any) => {
        const date = new Date(day.date);
        if (Number.isNaN(date.getTime())) return;

        const month = date.toLocaleString("default", { month: "short" });
        monthMap[month] = (monthMap[month] || 0) + (day.count ?? 0);
      });

      const monthOrder = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];

      const monthlyDataset: ContributionMonth[] = monthOrder
        .map((m) => ({
          month: m,
          contributions: monthMap[m] || 0,
        }))
        .filter((m) => m.contributions > 0);

      setStats({
        repos: profile.public_repos ?? 0,
        stars,
        followers: profile.followers ?? 0,
        contributions: contributionsTotal,
      });

      setContributionData(monthlyDataset);
      setLanguageData(languageDataset);
    } catch (err) {
      console.error("GitHub Fetch Error:", err);
      setError("Unable to load GitHub stats right now.");
    } finally {
      setLoading(false);
    }
  }

  const statsCards = [
    { title: "Repositories", value: stats.repos, icon: "📁" },
    { title: "Stars", value: stats.stars, icon: "⭐" },
    { title: "Followers", value: stats.followers, icon: "👥" },
    { title: "Contributions", value: stats.contributions, icon: "🧩" },
  ];

  return (
    <section
      id="github"
      className="w-full py-20 px-4 bg-slate-50/50 dark:bg-slate-900/20"
    >
      <div className="max-w-6xl mx-auto">
        <SectionTitle>GitHub Stats</SectionTitle>

        {loading && (
          <p className="mt-4 text-center text-sm text-muted-foreground">
            Loading GitHub stats...
          </p>
        )}

        {error && (
          <p className="mt-4 text-center text-sm text-red-500">{error}</p>
        )}

        {/* Overview Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
          {statsCards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card>
                <CardContent className="p-6 flex flex-col items-center">
                  <span className="text-3xl mb-2">{card.icon}</span>
                  <CardTitle className="text-2xl font-bold mb-1">
                    {card.value}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">{card.title}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {/* Bar Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Monthly Contributions</CardTitle>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={contributionData}>
                    <XAxis
                      dataKey="month"
                      tick={{ fill: isDark ? "#94a3b8" : "#475569" }}
                    />
                    <YAxis tick={{ fill: isDark ? "#94a3b8" : "#475569" }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: isDark ? "#1e293b" : "#ffffff",
                        borderColor: isDark ? "#334155" : "#e2e8f0",
                        color: isDark ? "#f8fafc" : "#0f172a",
                      }}
                    />
                    <Bar
                      dataKey="contributions"
                      fill="hsl(var(--chart-1))"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>

          {/* Pie Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Language Distribution</CardTitle>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={languageData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      paddingAngle={5}
                      dataKey="value"
                      label={({ name, percent }) =>
                        `${name} ${(percent * 100).toFixed(0)}%`
                      }
                      labelLine={false}
                    >
                      {languageData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#ffffff", 
                        borderColor: "#e2e8f0", 
                        color: "#ffffff", 
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
