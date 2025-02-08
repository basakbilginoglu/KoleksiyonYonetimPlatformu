"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortableItem from "../components/SortableItem";
import FilterPanel from "../components/FilterPanel";

interface Collection {
  id: string;
  name: string;
}

export default function CollectionsPage() {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [filteredCollections, setFilteredCollections] = useState<Collection[]>([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchCollections() {
      try {
        const response = await fetch("/api/collections");
        if (!response.ok) {
          throw new Error("Veri alınamadı");
        }
        const data: Collection[] = await response.json();
        setCollections(data);
        setFilteredCollections(data);
      } catch (error) {
        console.error("Hata:", error);
      }
    }
    fetchCollections();
  }, []);

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = filteredCollections.findIndex((c) => c.id === active.id);
    const newIndex = filteredCollections.findIndex((c) => c.id === over.id);

    const newOrder = arrayMove(filteredCollections, oldIndex, newIndex);
    setFilteredCollections(newOrder);
  };

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <h1 className="text-2xl font-bold mb-4">Koleksiyonlar</h1>
      <FilterPanel collections={collections} setFilteredCollections={setFilteredCollections} />
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={filteredCollections} strategy={verticalListSortingStrategy}>
          <ul className="w-full max-w-md border rounded-lg p-4 bg-white shadow">
            {filteredCollections.map((collection) => (
              <SortableItem key={collection.id} id={collection.id}>
                <div className="flex justify-between items-center p-2 border-b last:border-none">
                  <span>{collection.name}</span>
                  <Link href={`/edit/${collection.id}`} className="text-blue-500 hover:underline">
                    Sabitleri Düzenle
                  </Link>
                </div>
              </SortableItem>
            ))}
          </ul>
        </SortableContext>
      </DndContext>
    </div>
  );
}
