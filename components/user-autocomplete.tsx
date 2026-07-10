"use client";

import { useEffect, useState } from "react";
import { searchUsers } from "@/lib/actions/customers.action";
import { useDebounce } from "@/hooks/use-debounce";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandInput,
} from "@/components/ui/command";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";

type User = Awaited<ReturnType<typeof searchUsers>>[number];

interface UserAutocompleteProps {
  value?: string;
  onSelect: (user: User) => void;
}

export function UserAutocomplete({ value, onSelect }: UserAutocompleteProps) {
  const [open, setOpen] = useState(false);

  const [query, setQuery] = useState("");

  const [users, setUsers] = useState<User[]>([]);

  const [loading, setLoading] = useState(false);

  const debouncedQuery = useDebounce(query);

  useEffect(() => {
    async function fetchUsers() {
      if (debouncedQuery.length < 2) {
        setUsers([]);
        return;
      }

      setLoading(true);

      try {
        const data = await searchUsers(debouncedQuery);

        setUsers(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, [debouncedQuery]);

  const selectedUser = users.find((user) => user.id === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className="w-full justify-between"
        >
          {selectedUser?.name ?? "Search Customer"}

          <ChevronsUpDown className="h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[400px] p-0" align="start">
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="Search by Name, Phone Number, Email, Business Name..."
            value={query}
            onValueChange={setQuery}
          />

          <CommandList>
            {loading && <div className="p-3 text-sm">Searching...</div>}

            <CommandEmpty>No users found</CommandEmpty>

            <CommandGroup>
              {users.map((user) => (
                <CommandItem
                  key={user.id}
                  value={user.id}
                  onSelect={() => {
                    onSelect(user);
                    setOpen(false);
                  }}
                >
                  <div className="flex flex-col">
                    <span>{user.name}</span>

                    <span className="text-xs text-muted-foreground">
                      {user.email}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {`${user.phoneNumber} - ${user.businessName}`}
                    </span>
                  </div>

                  {value === user.id && <Check className="ml-auto h-4 w-4" />}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
