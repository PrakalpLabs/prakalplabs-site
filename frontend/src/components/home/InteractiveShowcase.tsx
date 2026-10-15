import React, { useState } from "react";
import { BarChart3, Mail, Database, Check, ArrowRight, RefreshCw, Cpu, Layers } from "lucide-react";

export function InteractiveShowcase() {
  const [activeTab, setActiveTab] = useState<"analytics" | "automation" | "telemetry">("analytics");
  const [metricFilter, setMetricFilter] = useState<"throughput" | "latency" | "savings">("throughput");

  return (
    <section className="py-20 md:py-28 bg-[#101521] border-y border-white/[0.06] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <span className="text-xs font-mono uppercase tracking-widest text-[#27D9C3] bg-[#27D9C3]/10 px-3 py-1 rounded-full border border-[#27D9C3]/20">
            MODULES IN ACTION
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F5F7FA]">
            See what your data has to tell you
          </h2>
          <p className="text-base sm:text-lg text-[#A5AFBF] leading-relaxed">
            Experience the precision of purpose-built software architectures tailored for modern enterprise performance.
          </p>
        </div>

        {/* Tab Selection Bar */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex items-center p-1.5 rounded-full bg-[#080B12] border border-white/10 shadow-lg">
            <button
              onClick={() => setActiveTab("analytics")}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-semibold transition-all duration-200 ${
                activeTab === "analytics"
                  ? "bg-[#7C5CFC] text-white shadow-md shadow-[#7C5CFC]/30"
                  : "text-[#A5AFBF] hover:text-[#F5F7FA]"
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Analytics Core</span>
            </button>

            <button
              onClick={() => setActiveTab("automation")}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-semibold transition-all duration-200 ${
                activeTab === "automation"
                  ? "bg-[#7C5CFC] text-white shadow-md shadow-[#7C5CFC]/30"
                  : "text-[#A5AFBF] hover:text-[#F5F7FA]"
              }`}
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Automation Stream</span>
            </button>

            <button
              onClick={() => setActiveTab("telemetry")}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-semibold transition-all duration-200 ${
                activeTab === "telemetry"
                  ? "bg-[#7C5CFC] text-white shadow-md shadow-[#7C5CFC]/30"
                  : "text-[#A5AFBF] hover:text-[#F5F7FA]"
              }`}
            >
              <Database className="w-3.5 h-3.5" />
              <span>Telemetry Hub</span>
            </button>
          </div>
        </div>

        {/* Interactive Showcase Canvas (styled after theme.mp4 preview card) */}
        <div className="max-w-4xl mx-auto rounded-3xl bg-[#141B29] border border-white/10 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          {/* Active Tab: Analytics Core */}
          {activeTab === "analytics" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
                <div>
                  <h4 className="text-base font-semibold text-[#F5F7FA] flex items-center gap-2">
                    <span>Performance Matrix &amp; Forecasting</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      LIVE FEED
                    </span>
                  </h4>
                  <p className="text-xs text-[#A5AFBF]">Calculated across 8 distributed cloud nodes</p>
                </div>

                {/* Filter toggles */}
                <div className="flex items-center gap-1.5 p-1 bg-[#101521] rounded-lg border border-white/[0.06] text-xs font-mono">
                  <button
                    onClick={() => setMetricFilter("throughput")}
                    className={`px-3 py-1 rounded transition-colors ${
                      metricFilter === "throughput"
                        ? "bg-[#7C5CFC] text-white"
                        : "text-[#A5AFBF] hover:text-white"
                    }`}
                  >
                    Throughput
                  </button>
                  <button
                    onClick={() => setMetricFilter("latency")}
                    className={`px-3 py-1 rounded transition-colors ${
                      metricFilter === "latency"
                        ? "bg-[#7C5CFC] text-white"
                        : "text-[#A5AFBF] hover:text-white"
                    }`}
                  >
                    Latency
                  </button>
                  <button
                    onClick={() => setMetricFilter("savings")}
                    className={`px-3 py-1 rounded transition-colors ${
                      metricFilter === "savings"
                        ? "bg-[#7C5CFC] text-white"
                        : "text-[#A5AFBF] hover:text-white"
                    }`}
                  >
                    Cloud Cost
                  </button>
                </div>
              </div>

              {/* Dynamic Chart Display */}
              <div className="bg-[#080B12] rounded-2xl p-6 border border-white/[0.06]">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <span className="text-xs text-[#A5AFBF] font-mono uppercase">
                      {metricFilter === "throughput" && "Peak Operations / Sec"}
                      {metricFilter === "latency" && "Round-Trip Latency Target"}
                      {metricFilter === "savings" && "Infrastructure Overhead Reduced"}
                    </span>
                    <div className="text-2xl font-bold font-mono text-[#F5F7FA] mt-0.5">
                      {metricFilter === "throughput" && "18,420 req/s"}
                      {metricFilter === "latency" && "9.4ms (p99)"}
                      {metricFilter === "savings" && "42.8% Saved"}
                    </div>
                  </div>
                  <span className="text-xs text-[#27D9C3] font-mono font-semibold flex items-center gap-1">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    Auto-Refreshing
                  </span>
                </div>

                {/* Bar Graph Simulation */}
                <div className="h-44 flex items-end gap-3 pt-4 border-b border-white/[0.06]">
                  {[
                    { label: "00:00", val: 40 },
                    { label: "04:00", val: 30 },
                    { label: "08:00", val: 65 },
                    { label: "12:00", val: 85 },
                    { label: "16:00", val: 95 },
                    { label: "20:00", val: 78 },
                    { label: "24:00", val: 50 },
                  ].map((bar, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                      <div
                        className="w-full bg-gradient-to-t from-[#7C5CFC]/30 to-[#7C5CFC] rounded-t-md hover:to-[#27D9C3] transition-all duration-300"
                        style={{ height: `${metricFilter === "latency" ? 110 - bar.val : bar.val}%` }}
                      />
                      <span className="text-[10px] text-[#A5AFBF]/60 font-mono">{bar.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <p className="text-center text-xs text-[#A5AFBF] pt-2">
                Watch how <strong className="text-[#F5F7FA]">Analytics Core</strong> transforms telemetry streams into instantaneous, actionable decisions for operations teams.
              </p>
            </div>
          )}

          {/* Active Tab: Automation Stream */}
          {activeTab === "automation" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
                <div>
                  <h4 className="text-base font-semibold text-[#F5F7FA]">Automated Webhook &amp; Event Stream</h4>
                  <p className="text-xs text-[#A5AFBF]">Incoming events categorized and reconciled instantly</p>
                </div>
                <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
                  <Check className="w-4 h-4" /> Queue: 0 Backlog
                </span>
              </div>

              {/* Event Stream List (from theme.mp4) */}
              <div className="space-y-2.5 font-mono text-xs">
                {[
                  {
                    id: "EVT-8921",
                    source: "shopify-webhook",
                    event: "ORDER_CREATED",
                    status: "DISPATCHED",
                    latency: "1.2ms",
                    color: "border-purple-500/30 text-[#9D84FD]",
                  },
                  {
                    id: "EVT-8922",
                    source: "stripe-charge",
                    event: "PAYMENT_CONFIRMED",
                    status: "VERIFIED",
                    latency: "0.8ms",
                    color: "border-emerald-500/30 text-emerald-400",
                  },
                  {
                    id: "EVT-8923",
                    source: "salesforce-sync",
                    event: "ACCOUNT_UPDATED",
                    status: "SYNCHRONIZED",
                    latency: "2.1ms",
                    color: "border-cyan-500/30 text-[#27D9C3]",
                  },
                  {
                    id: "EVT-8924",
                    source: "sap-inventory",
                    event: "STOCK_RECONCILED",
                    status: "PROCESSED",
                    latency: "1.5ms",
                    color: "border-amber-500/30 text-amber-400",
                  },
                ].map((item) => (
                  <div
                    key={item.id}
                    className="p-3.5 rounded-xl bg-[#080B12] border border-white/[0.06] flex items-center justify-between gap-4 hover:border-white/20 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-[#A5AFBF]">{item.id}</span>
                      <span className="text-white font-medium">{item.event}</span>
                      <span className="text-[10px] text-[#A5AFBF]/60 hidden sm:inline">{item.source}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] border ${item.color}`}>
                        {item.status}
                      </span>
                      <span className="text-[#A5AFBF]/60 text-[11px]">{item.latency}</span>
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-center text-xs text-[#A5AFBF] pt-2">
                Watch how <strong className="text-[#F5F7FA]">Automation Stream</strong> unlocks operational speed by routing critical transactions directly to databases with zero human lag.
              </p>
            </div>
          )}

          {/* Active Tab: Telemetry Hub */}
          {activeTab === "telemetry" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
                <div>
                  <h4 className="text-base font-semibold text-[#F5F7FA]">Distributed Microservice Telemetry</h4>
                  <p className="text-xs text-[#A5AFBF]">Real-time system health across hybrid infrastructure</p>
                </div>
                <span className="text-xs font-mono text-[#27D9C3] flex items-center gap-1.5">
                  <Cpu className="w-4 h-4" /> CPU: 18% Load
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-[#080B12] border border-white/[0.06] space-y-2">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-[#A5AFBF]">API Gateway (us-east)</span>
                    <span className="text-emerald-400 font-semibold">Healthy</span>
                  </div>
                  <div className="text-xl font-bold font-mono text-[#F5F7FA]">8.2ms</div>
                  <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-[#7C5CFC] h-full rounded-full" style={{ width: "95%" }} />
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#080B12] border border-white/[0.06] space-y-2">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-[#A5AFBF]">Redis Connection Pool</span>
                    <span className="text-emerald-400 font-semibold">Optimal</span>
                  </div>
                  <div className="text-xl font-bold font-mono text-[#F5F7FA]">99.99%</div>
                  <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-[#27D9C3] h-full rounded-full" style={{ width: "99%" }} />
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#080B12] border border-white/[0.06] space-y-2">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-[#A5AFBF]">Database Replication</span>
                    <span className="text-emerald-400 font-semibold">In Sync</span>
                  </div>
                  <div className="text-xl font-bold font-mono text-[#F5F7FA]">0.2s Lag</div>
                  <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-emerald-400 h-full rounded-full" style={{ width: "98%" }} />
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#080B12] border border-white/[0.06] space-y-2">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-[#A5AFBF]">SSL / TLS Certificates</span>
                    <span className="text-emerald-400 font-semibold">Valid</span>
                  </div>
                  <div className="text-xl font-bold font-mono text-[#F5F7FA]">312 Days Rem.</div>
                  <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-[#9D84FD] h-full rounded-full" style={{ width: "85%" }} />
                  </div>
                </div>
              </div>

              <p className="text-center text-xs text-[#A5AFBF] pt-2">
                Watch how <strong className="text-[#F5F7FA]">Telemetry Hub</strong> guarantees high-availability reliability and continuous operational uptime.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
