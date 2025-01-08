import { twx } from '@/lib/utils';

const Input = twx.input`flex h-9 w-full rounded-md border border-input
bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0
file:bg-transparent file:text-sm file:font-medium file:text-foreground
placeholder:text-muted-foreground focus-visible:outline-none
focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed
disabled:opacity-50 md:text-sm`;
Input.displayName = 'Input';

const InputGroup = twx.div`relative inline-flex flex-row items-center gap-0
[&>:first-child]:-mr-px [&>:first-child]:rounded-r-none
[&_input]:rounded-l-none`;
InputGroup.displayName = 'InputGroup';

const InputAddon = twx.label`flex min-w-fit items-center rounded-md rounded-l-md
border border-input bg-secondary px-3 py-1 text-base font-bold
text-secondary-foreground md:text-sm`;
InputAddon.displayName = 'InputAddon';

export { Input, InputGroup, InputAddon };
