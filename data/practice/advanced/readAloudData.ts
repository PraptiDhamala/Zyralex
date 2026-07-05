export const advancedReadAloud = Array.from({ length: 40 }, (_, idx) => {
  const scripts = [
    "The beautiful scenery took our breath away as we hiked up the mountainside.",
    "An enormous African elephant walked slowly across the wide grassy plain.",
    "Yesterday morning, we visited the science museum to see the old exhibits.",
    "Please remember to tie your shoelaces tightly before joining the race.",
    "Clear scientific communication carries an extraordinary responsibility for future global health.",
    "Environmental changes require us to build sustainable habits within our local communities."
  ];
  return { sentence: scripts[idx % scripts.length] };
});