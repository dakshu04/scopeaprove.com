"use client";

import { useRef, useState } from "react";
import { Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type ScopeItemField = {
  id: number;
};

export function ScopeItemsField({
  compact = false,
}: {
  compact?: boolean;
}) {
  const nextId = useRef(2);
  const [items, setItems] = useState<ScopeItemField[]>([{ id: 1 }]);

  function addItem() {
    setItems((currentItems) => [
      ...currentItems,
      { id: nextId.current++ },
    ]);
  }

  function removeItem(id: number) {
    setItems((currentItems) =>
      currentItems.filter((item) => item.id !== id),
    );
  }

  return (
    <section className={compact ? "space-y-3 border-t border-border pt-4" : "space-y-4 border-t border-border pt-6"}>
      <div>
        <h2 className="text-sm font-semibold">Initial scope</h2>
        <p className="mt-1 text-xs text-muted-foreground">
          List the work included in the original project agreement.
        </p>
      </div>

      <div className={compact ? "space-y-2" : "space-y-3"}>
        {items.map((item, index) => {
          const inputId = `scope-item-${item.id}`;

          return (
            <div
              key={item.id}
              className="flex items-end gap-2"
            >
              <div className="min-w-0 flex-1 space-y-2">
                <Label htmlFor={inputId} className={compact ? "text-xs" : undefined}>
                  Scope item {index + 1}
                </Label>

                <Input
                  id={inputId}
                  name="scopeItems"
                  required
                  maxLength={160}
                  placeholder={
                    index === 0
                      ? "e.g. Design and build the homepage"
                      : "Add another agreed deliverable"
                  }
                />
              </div>

              {items.length > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => removeItem(item.id)}
                  aria-label={`Remove scope item ${index + 1}`}
                >
                  <Trash2 aria-hidden="true" />
                </Button>
              )}
            </div>
          );
        })}
      </div>

      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={addItem}
        disabled={items.length >= 20}
      >
        <Plus aria-hidden="true" />
        Add scope item
      </Button>
    </section>
  );
}
