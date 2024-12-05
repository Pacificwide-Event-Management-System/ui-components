export default function ArrowSort({ color = '#6B6566' }: { color?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="8" height="12" fill="none" viewBox="0 0 8 12">
      <path
        fill={color}
        fillRule="evenodd"
        d="M3.558.558a.625.625 0 01.884 0l3.334 3.333a.625.625 0 01-.884.884L4.625 2.51V11a.625.625 0 11-1.25 0V2.509L1.11 4.775a.625.625 0 01-.884-.884L3.558.558z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}
