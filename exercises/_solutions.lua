-- _solutions.lua
-- Single-source exercise documents: questions and solutions share one .qmd.
-- Retitle the document when the `solutions` metadata flag is set (-M solutions:true).
-- Solution content is gated with Quarto profiles:
--   ::: {.content-visible when-profile="solutions"} ... :::
function Meta(meta)
  if meta.solutions == true then
    local t = pandoc.utils.stringify(meta.title or "")
    meta.title = pandoc.MetaString(t:gsub("Exercises", "Solutions"))
  end
  return meta
end
