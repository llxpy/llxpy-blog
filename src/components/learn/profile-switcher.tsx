import { useState } from "react"
import { Check, Pencil, Plus, Trash2, UserRound } from "lucide-react"
import { cn } from "@/lib/utils"
import type { useLearnStore } from "@/hooks/use-learn-store"

export function ProfileSwitcher({
  store,
}: {
  store: ReturnType<typeof useLearnStore>
}) {
  const [open, setOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editName, setEditName] = useState("")
  const [newName, setNewName] = useState("")

  const active = store.activeProfile

  const startEdit = (id: string, name: string) => {
    setEditingId(id)
    setEditName(name)
  }

  const saveEdit = () => {
    if (editingId && editName.trim()) store.renameProfile(editingId, editName)
    setEditingId(null)
  }

  return (
    <>
      {/* 当前用户按钮 */}
      <button
        onClick={() => setOpen(true)}
        className="group flex items-center gap-2 rounded-xl border border-border/60 bg-card/60 px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/30 hover:text-foreground"
      >
        <span
          className={cn(
            "flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br text-[10px] font-bold text-black",
            active?.color
          )}
        >
          {active?.name?.slice(0, 1) || "新"}
        </span>
        <span className="max-w-[72px] truncate">{active?.name ?? "新同学"}</span>
        <UserRound className="h-3.5 w-3.5 opacity-60 transition-opacity group-hover:opacity-100" />
      </button>

      {/* 弹窗 */}
      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-5 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpen(false)
          }}
        >
          <div className="w-full max-w-md rounded-2xl border border-border/60 bg-background p-6 shadow-2xl">
            <div className="mb-1 flex items-center justify-between">
              <h4 className="text-base font-bold">学习档案</h4>
              <span className="text-[11px] text-muted-foreground">
                {store.profiles.length} 个 · 数据保存在本机浏览器
              </span>
            </div>
            <p className="mb-4 text-xs text-muted-foreground">
              同一台设备上可切换多个档案，各自的学习进度、任务与打卡互不影响。
            </p>

            {/* 档案列表 */}
            <div className="mb-4 max-h-64 space-y-2 overflow-y-auto pr-1">
              {store.profiles.map((p) => {
                const isActive = p.id === active?.id
                const isEditing = editingId === p.id
                return (
                  <div
                    key={p.id}
                    className={cn(
                      "flex items-center gap-3 rounded-xl border px-3 py-2.5 transition-colors",
                      isActive
                        ? "border-primary/30 bg-primary/[0.06]"
                        : "border-border/40 bg-card/40"
                    )}
                  >
                    <span
                      className={cn(
                        "flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br text-xs font-bold text-black",
                        p.color
                      )}
                    >
                      {p.name.slice(0, 1)}
                    </span>

                    {isEditing ? (
                      <input
                        autoFocus
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") saveEdit()
                          if (e.key === "Escape") setEditingId(null)
                        }}
                        className="min-w-0 flex-1 rounded-lg border border-border/60 bg-card/60 px-2 py-1 text-sm focus:border-primary/50 focus:outline-none"
                      />
                    ) : (
                      <span className="min-w-0 flex-1 truncate text-sm font-medium">
                        {p.name}
                        {isActive && (
                          <span className="ml-2 rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-medium text-primary">
                            当前
                          </span>
                        )}
                      </span>
                    )}

                    <div className="flex shrink-0 gap-1">
                      {!isEditing && (
                        <button
                          onClick={() => startEdit(p.id, p.name)}
                          className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-white/[0.05] hover:text-foreground"
                          title="重命名"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </button>
                      )}
                      {isEditing && (
                        <button
                          onClick={saveEdit}
                          className="rounded-md p-1.5 text-emerald-400 transition-colors hover:bg-emerald-500/10"
                          title="保存"
                        >
                          <Check className="h-3.5 w-3.5" />
                        </button>
                      )}
                      {store.profiles.length > 1 && (
                        <button
                          onClick={() => {
                            if (
                              window.confirm(`删除档案「${p.name}」？其学习数据将一并删除。`)
                            )
                              store.deleteProfile(p.id)
                          }}
                          className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-red-500/10 hover:text-red-400"
                          title="删除"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      )}
                      {!isActive && !isEditing && (
                        <button
                          onClick={() => store.switchProfile(p.id)}
                          className="rounded-md bg-primary/10 px-2 py-1 text-[11px] font-medium text-primary transition-colors hover:bg-primary/20"
                        >
                          切换
                        </button>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* 新建档案 */}
            <div className="flex gap-2">
              <input
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    store.createProfile(newName)
                    setNewName("")
                    setOpen(false)
                  }
                }}
                placeholder="输入昵称，开启新的档案…"
                className="min-w-0 flex-1 rounded-lg border border-border/60 bg-card/60 px-3 py-2 text-sm placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none"
              />
              <button
                onClick={() => {
                  store.createProfile(newName)
                  setNewName("")
                  setOpen(false)
                }}
                className="shrink-0 rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-black transition-all hover:brightness-110"
              >
                <Plus className="h-4 w-4" />
                新建
              </button>
            </div>

            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setOpen(false)}
                className="rounded-lg border border-border/60 bg-card/60 px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground"
              >
                关闭
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}