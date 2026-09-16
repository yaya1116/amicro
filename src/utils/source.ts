export interface SourceFile { path: string; content: string }
interface SourceManifest { components: Record<string, string[]>; files: Record<string, string> }

export async function loadSource(id: string, signal?: AbortSignal): Promise<SourceFile[]> {
  const response = await fetch('/component-source/manifest.json', { signal });
  if (!response.ok) throw new Error('Source manifest unavailable');
  const manifest: SourceManifest = await response.json();
  const paths = manifest.components[id];
  if (!paths?.length) throw new Error('Source unavailable');
  return Promise.all(paths.map(async path => {
    const filename = manifest.files[path];
    if (!filename || !/^[a-f0-9]{64}\.json$/.test(filename)) throw new Error('Invalid source file');
    const result = await fetch(`/component-source/${filename}`, { signal });
    if (!result.ok) throw new Error('Source file unavailable');
    return { path: path.replace(/^examples\/[^/]+\//, ''), content: await result.json() as string };
  }));
}
