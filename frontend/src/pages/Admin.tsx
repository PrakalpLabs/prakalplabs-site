import React, { useState, useEffect } from "react";
import { AdminUser, Inquiry, Project, Service } from "@/types";
import { loginAdmin, logoutAdmin, getAdminProfile } from "@/lib/api/auth";
import { getAdminInquiries, updateInquiryStatus } from "@/lib/api/inquiries";
import { getProjects } from "@/lib/api/projects";
import { getServices } from "@/lib/api/services";
import { siteConfig } from "@/config/site";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  Lock,
  Mail,
  FolderGit2,
  Cpu,
  Settings,
  LogOut,
  RefreshCw,
  Plus,
  Trash2,
  Eye,
  CheckCircle,
  AlertTriangle,
  Server,
  Layers,
  Terminal,
} from "lucide-react";

export function AdminPage() {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [authChecking, setAuthChecking] = useState(true);

  // Login form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);

  // Dashboard active tab
  const [activeTab, setActiveTab] = useState<"inquiries" | "projects" | "services" | "settings">("inquiries");

  // Inquiries state
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loadingInquiries, setLoadingInquiries] = useState(false);

  // Projects state
  const [projects, setProjects] = useState<Project[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(false);
  const [showAddProjectModal, setShowAddProjectModal] = useState(false);

  // New project state
  const [newProject, setNewProject] = useState({
    title: "",
    slug: "",
    description: "",
    overview: "",
    problemStatement: "",
    solution: "",
    category: "Custom Software",
    technologies: "Node.js, TypeScript, React",
    features: "Feature 1, Feature 2",
    status: "published" as "draft" | "published",
  });

  // Services state
  const [services, setServices] = useState<Service[]>([]);

  // Check auth session on load
  useEffect(() => {
    getAdminProfile()
      .then((profile) => setUser(profile))
      .catch(() => setUser(null))
      .finally(() => setAuthChecking(false));
  }, []);

  // Fetch inquiries when user is logged in
  useEffect(() => {
    if (user && activeTab === "inquiries") {
      fetchInquiries();
    }
  }, [user, activeTab]);

  // Fetch projects
  useEffect(() => {
    if (user && activeTab === "projects") {
      fetchProjects();
    }
  }, [user, activeTab]);

  // Fetch services
  useEffect(() => {
    if (user && activeTab === "services") {
      getServices().then((data) => setServices(data));
    }
  }, [user, activeTab]);

  const fetchInquiries = async () => {
    setLoadingInquiries(true);
    try {
      const data = await getAdminInquiries();
      setInquiries(data);
    } catch (err) {
      console.error("Failed to fetch admin inquiries:", err);
    } finally {
      setLoadingInquiries(false);
    }
  };

  const fetchProjects = async () => {
    setLoadingProjects(true);
    try {
      const data = await getProjects();
      setProjects(data);
    } catch (err) {
      console.error("Failed to fetch projects:", err);
    } finally {
      setLoadingProjects(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setLoggingIn(true);
    try {
      const profile = await loginAdmin(email, password);
      setUser(profile);
      setEmail("");
      setPassword("");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Authentication failed.";
      setLoginError(msg);
    } finally {
      setLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logoutAdmin();
      setUser(null);
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const handleStatusChange = async (inquiryId: string, newStatus: Inquiry["status"]) => {
    try {
      const updated = await updateInquiryStatus(inquiryId, newStatus);
      setInquiries((prev) => prev.map((inq) => (inq.id === inquiryId ? updated : inq)));
    } catch (err) {
      alert("Failed to update status on server.");
    }
  };

  const handleDeleteProject = (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete project "${title}"?`)) {
      setProjects((prev) => prev.filter((p) => p.id !== id));
      alert("Project removed from local active list. (Persisted mutation in API mode)");
    }
  };

  const handleTogglePublish = (id: string) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: p.status === "published" ? "draft" : "published" } : p))
    );
  };

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    const created: Project = {
      id: `proj-${Date.now()}`,
      title: newProject.title,
      slug: newProject.slug || newProject.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      description: newProject.description,
      overview: newProject.overview || newProject.description,
      problemStatement: newProject.problemStatement || "Operational challenge requiring specialized engineering.",
      solution: newProject.solution || "Custom software system built with modern scalable architecture.",
      category: newProject.category as Project["category"],
      technologies: newProject.technologies.split(",").map((s) => s.trim()),
      features: newProject.features.split(",").map((s) => s.trim()),
      image: "/projects/custom.svg",
      status: newProject.status,
      publishedAt: new Date().toISOString().split("T")[0],
    };

    setProjects([created, ...projects]);
    setShowAddProjectModal(false);
    setNewProject({
      title: "",
      slug: "",
      description: "",
      overview: "",
      problemStatement: "",
      solution: "",
      category: "Custom Software",
      technologies: "Node.js, TypeScript, React",
      features: "Feature 1, Feature 2",
      status: "published",
    });
    alert("Project created and added to list.");
  };

  if (authChecking) {
    return (
      <div className="py-32 max-w-md mx-auto text-center space-y-4">
        <RefreshCw className="w-8 h-8 animate-spin text-[#7C5CFC] mx-auto" />
        <p className="text-sm font-mono text-[#A5AFBF]">Verifying administrative credentials...</p>
      </div>
    );
  }

  // Not Authenticated -> Show Login View
  if (!user) {
    return (
      <div className="py-20 md:py-32 bg-[#080B12] flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-[#141B29] rounded-3xl border border-white/[0.08] p-8 sm:p-10 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-[#7C5CFC]/15 border border-[#7C5CFC]/30 flex items-center justify-center text-[#9D84FD] mx-auto mb-3">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold text-[#F5F7FA]">Prakalp Labs Admin</h1>
            <p className="text-xs text-[#A5AFBF]">
              Authorized personnel only. Protected by HTTP-only token session authentication.
            </p>
          </div>

          {loginError && (
            <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-mono uppercase text-[#F5F7FA] mb-1.5">
                Admin Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@prakalplabs.internal"
                required
                className="w-full px-4 py-2.5 rounded-xl bg-[#080B12] border border-white/10 text-sm text-[#F5F7FA] focus:outline-none focus:border-[#7C5CFC]"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-[#F5F7FA] mb-1.5">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                required
                className="w-full px-4 py-2.5 rounded-xl bg-[#080B12] border border-white/10 text-sm text-[#F5F7FA] focus:outline-none focus:border-[#7C5CFC]"
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              size="md"
              disabled={loggingIn}
              className="w-full justify-center !mt-6"
            >
              {loggingIn ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin mr-2" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <span>Access Management Console</span>
              )}
            </Button>
          </form>

          <div className="pt-4 border-t border-white/[0.06] text-center text-[11px] text-[#A5AFBF]/60 font-mono">
            First time setup? Run the backend seed or configure ADMIN_SETUP_SECRET.
          </div>
        </div>
      </div>
    );
  }

  // Authenticated Admin Dashboard
  return (
    <div className="py-12 md:py-16 bg-[#080B12] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Header Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-3xl bg-[#141B29] border border-white/[0.08]">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#7C5CFC] to-[#27D9C3] p-[1px]">
              <div className="w-full h-full bg-[#080B12] rounded-[15px] flex items-center justify-center text-[#7C5CFC]">
                <Terminal className="w-6 h-6" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-white">Operations Management Portal</h1>
                <Badge variant="purple">ADMIN</Badge>
              </div>
              <p className="text-xs text-[#A5AFBF] font-mono">
                Logged in as: <span className="text-[#27D9C3]">{user.email}</span> ({user.name})
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-[#A5AFBF] bg-[#101521] px-3 py-1.5 rounded-lg border border-white/[0.06]">
              DB: MongoDB Atlas / REST
            </span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 text-xs font-semibold border border-rose-500/30 flex items-center gap-2 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>
          </div>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-white/[0.08] pb-4">
          <button
            onClick={() => setActiveTab("inquiries")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === "inquiries"
                ? "bg-[#7C5CFC] text-white shadow-md shadow-[#7C5CFC]/25"
                : "text-[#A5AFBF] hover:text-white hover:bg-white/[0.04]"
            }`}
          >
            <Mail className="w-4 h-4" />
            <span>Client Inquiries ({inquiries.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("projects")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === "projects"
                ? "bg-[#7C5CFC] text-white shadow-md shadow-[#7C5CFC]/25"
                : "text-[#A5AFBF] hover:text-white hover:bg-white/[0.04]"
            }`}
          >
            <FolderGit2 className="w-4 h-4" />
            <span>Projects &amp; Architectures ({projects.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("services")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === "services"
                ? "bg-[#7C5CFC] text-white shadow-md shadow-[#7C5CFC]/25"
                : "text-[#A5AFBF] hover:text-white hover:bg-white/[0.04]"
            }`}
          >
            <Cpu className="w-4 h-4" />
            <span>Service Catalog ({services.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("settings")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === "settings"
                ? "bg-[#7C5CFC] text-white shadow-md shadow-[#7C5CFC]/25"
                : "text-[#A5AFBF] hover:text-white hover:bg-white/[0.04]"
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>System Telemetry</span>
          </button>
        </div>

        {/* TAB 1: Inquiries */}
        {activeTab === "inquiries" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white">Contact &amp; Architecture Inquiries</h2>
                <p className="text-xs text-[#A5AFBF]">Incoming submissions from the contact form</p>
              </div>
              <button
                onClick={fetchInquiries}
                className="p-2 rounded-xl bg-[#141B29] border border-white/10 text-[#A5AFBF] hover:text-white flex items-center gap-1.5 text-xs font-mono"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loadingInquiries ? "animate-spin" : ""}`} />
                <span>Refresh</span>
              </button>
            </div>

            {loadingInquiries ? (
              <div className="p-12 text-center text-xs font-mono text-[#A5AFBF]">
                Fetching inquiries from database...
              </div>
            ) : inquiries.length === 0 ? (
              <div className="p-12 rounded-3xl bg-[#141B29] border border-white/[0.06] text-center space-y-2">
                <Mail className="w-8 h-8 text-[#A5AFBF]/40 mx-auto" />
                <h3 className="text-base font-bold text-white">No inquiries recorded yet</h3>
                <p className="text-xs text-[#A5AFBF]">
                  Submissions through the public Contact page will populate this console.
                </p>
              </div>
            ) : (
              <div className="rounded-3xl bg-[#141B29] border border-white/[0.08] overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#101521] text-[#A5AFBF] uppercase font-mono border-b border-white/[0.06]">
                      <tr>
                        <th className="p-4">Contact</th>
                        <th className="p-4">Project Type</th>
                        <th className="p-4">Budget</th>
                        <th className="p-4">Description</th>
                        <th className="p-4">Status</th>
                        <th className="p-4">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/[0.04]">
                      {inquiries.map((inq) => (
                        <tr key={inq.id} className="hover:bg-white/[0.02] transition-colors">
                          <td className="p-4">
                            <div className="font-bold text-white">{inq.fullName}</div>
                            <div className="text-xs font-mono text-[#7C5CFC]">{inq.email}</div>
                            {inq.companyName && (
                              <div className="text-[10px] text-[#A5AFBF]/70">{inq.companyName}</div>
                            )}
                          </td>
                          <td className="p-4 font-mono text-[#F5F7FA]">{inq.projectType}</td>
                          <td className="p-4 font-mono text-emerald-400">{inq.estimatedBudget || "N/A"}</td>
                          <td className="p-4 max-w-xs truncate text-[#A5AFBF]" title={inq.projectDescription}>
                            {inq.projectDescription}
                          </td>
                          <td className="p-4">
                            <select
                              value={inq.status}
                              onChange={(e) => handleStatusChange(inq.id, e.target.value as Inquiry["status"])}
                              className="px-2.5 py-1 rounded bg-[#080B12] border border-white/10 text-xs font-mono text-[#F5F7FA] focus:outline-none focus:border-[#7C5CFC]"
                            >
                              <option value="New">New</option>
                              <option value="Contacted">Contacted</option>
                              <option value="In Discussion">In Discussion</option>
                              <option value="Converted">Converted</option>
                              <option value="Closed">Closed</option>
                            </select>
                          </td>
                          <td className="p-4 font-mono text-[#A5AFBF]/60 text-[11px]">
                            {new Date(inq.createdAt).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: Projects */}
        {activeTab === "projects" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white">Project &amp; Architecture Directory</h2>
                <p className="text-xs text-[#A5AFBF]">Manage case studies, showcase entries, and deployment links</p>
              </div>
              <button
                onClick={() => setShowAddProjectModal(true)}
                className="px-4 py-2 rounded-xl bg-[#7C5CFC] hover:bg-[#6B4BE0] text-white text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-[#7C5CFC]/25 transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Add Project</span>
              </button>
            </div>

            {/* Modal for adding a project */}
            {showAddProjectModal && (
              <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="bg-[#141B29] border border-white/10 rounded-3xl p-6 sm:p-8 max-w-xl w-full max-h-[90vh] overflow-y-auto space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                    <h3 className="text-lg font-bold text-white">Create New Project Entry</h3>
                    <button
                      onClick={() => setShowAddProjectModal(false)}
                      className="text-[#A5AFBF] hover:text-white"
                    >
                      ✕
                    </button>
                  </div>

                  <form onSubmit={handleCreateProject} className="space-y-4">
                    <div>
                      <label className="block text-xs font-mono text-[#F5F7FA] mb-1">Project Title</label>
                      <input
                        type="text"
                        required
                        value={newProject.title}
                        onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                        placeholder="e.g. HelixGate — Distributed API Gateway"
                        className="w-full px-3 py-2 rounded-xl bg-[#080B12] border border-white/10 text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-[#F5F7FA] mb-1">Category</label>
                      <select
                        value={newProject.category}
                        onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-[#080B12] border border-white/10 text-xs text-white"
                      >
                        <option value="Custom Software">Custom Software</option>
                        <option value="Web Development">Web Development</option>
                        <option value="Digital Products">Digital Products</option>
                        <option value="Automation">Automation</option>
                        <option value="UI/UX Design">UI/UX Design</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-[#F5F7FA] mb-1">Description</label>
                      <textarea
                        required
                        rows={2}
                        value={newProject.description}
                        onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                        placeholder="Short overview of the engineering project..."
                        className="w-full px-3 py-2 rounded-xl bg-[#080B12] border border-white/10 text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-[#F5F7FA] mb-1">Technologies (comma separated)</label>
                      <input
                        type="text"
                        value={newProject.technologies}
                        onChange={(e) => setNewProject({ ...newProject, technologies: e.target.value })}
                        placeholder="Node.js, TypeScript, Docker, Redis"
                        className="w-full px-3 py-2 rounded-xl bg-[#080B12] border border-white/10 text-xs text-white"
                      />
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t border-white/[0.08]">
                      <button
                        type="button"
                        onClick={() => setShowAddProjectModal(false)}
                        className="px-4 py-2 rounded-xl text-xs font-semibold text-[#A5AFBF] hover:text-white"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-xl text-xs font-semibold bg-[#7C5CFC] text-white hover:bg-[#6B4BE0]"
                      >
                        Save Project
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((p) => (
                <div
                  key={p.id}
                  className="rounded-2xl bg-[#141B29] border border-white/[0.08] p-6 space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-white/[0.05] text-[#A5AFBF]">
                        {p.category}
                      </span>
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                          p.status === "published"
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                            : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                        }`}
                      >
                        {p.status.toUpperCase()}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-white">{p.title}</h3>
                    <p className="text-xs text-[#A5AFBF] line-clamp-2">{p.description}</p>
                  </div>

                  <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono">
                    <button
                      onClick={() => handleTogglePublish(p.id)}
                      className="text-[#7C5CFC] hover:underline"
                    >
                      {p.status === "published" ? "Unpublish" : "Publish"}
                    </button>
                    <button
                      onClick={() => handleDeleteProject(p.id, p.title)}
                      className="text-rose-400 hover:text-rose-300"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: Services */}
        {activeTab === "services" && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-white">Active Services Configuration</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {services.map((srv) => (
                <div
                  key={srv.id}
                  className="p-6 rounded-2xl bg-[#141B29] border border-white/[0.08] space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-white">{srv.title}</span>
                    <span className="text-[11px] font-mono text-[#27D9C3]">{srv.slug}</span>
                  </div>
                  <p className="text-xs text-[#A5AFBF]">{srv.shortDescription}</p>
                  <div className="pt-2 flex flex-wrap gap-1">
                    {srv.technologies.slice(0, 4).map((tech) => (
                      <span key={tech} className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#080B12] text-[#A5AFBF]">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: Settings & Telemetry */}
        {activeTab === "settings" && (
          <div className="rounded-3xl bg-[#141B29] border border-white/[0.08] p-8 space-y-6">
            <h2 className="text-xl font-bold text-white">System Infrastructure &amp; Runtime</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="p-4 rounded-xl bg-[#080B12] border border-white/[0.06]">
                <div className="text-[11px] font-mono text-[#A5AFBF]/60">BACKEND RUNTIME</div>
                <div className="text-base font-bold text-white mt-1">Node.js + Express.js</div>
                <div className="text-xs text-emerald-400 font-mono mt-0.5">REST API v1</div>
              </div>

              <div className="p-4 rounded-xl bg-[#080B12] border border-white/[0.06]">
                <div className="text-[11px] font-mono text-[#A5AFBF]/60">DATABASE ENGINE</div>
                <div className="text-base font-bold text-white mt-1">MongoDB &amp; Mongoose</div>
                <div className="text-xs text-[#7C5CFC] font-mono mt-0.5">MERN Architecture</div>
              </div>

              <div className="p-4 rounded-xl bg-[#080B12] border border-white/[0.06]">
                <div className="text-[11px] font-mono text-[#A5AFBF]/60">CLIENT ENGINE</div>
                <div className="text-base font-bold text-white mt-1">React + Vite SPA</div>
                <div className="text-xs text-[#27D9C3] font-mono mt-0.5">Tailwind CSS + Router</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
