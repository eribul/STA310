-- _solutions.lua
-- Single-source lab document: questions and solutions share one .qmd.
-- Appends " — Solutions" to the title when the `solutions` metadata flag is set
-- (-M solutions:true).
function Meta(meta)
  if meta.solutions == true then
    local t = pandoc.utils.stringify(meta.title or "")
    if not t:find("[Ss]olutions") then
      meta.title = pandoc.MetaString(t .. " — Solutions")
    end
  end
  return meta
end
