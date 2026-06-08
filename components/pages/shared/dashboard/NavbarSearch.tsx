/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect, useRef } from "react";
import { Search, X, Briefcase, Layout, CheckSquare } from "lucide-react";
import Link from "next/link";

export default function NavbarSearch() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<{ workspaces?: any[]; boards?: any[]; cards?: any[] } | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Mock search items
    const mockWorkspaces = [
        { id: "w1", name: "Product Ops Workspace", description: "For operations & roadmap plans" },
        { id: "w2", name: "Optilux CRM Workspace", description: "Optilux client relations" }
    ];

    const mockBoards = [
        { id: "b1", workspace_id: "w1", name: "Mobile App Board", description: "Kanban board for android/ios redesign" },
        { id: "b2", workspace_id: "w1", name: "Security Auditing", description: "Security reviews" }
    ];

    const mockCards = [
        { id: "c1", board_id: "b1", workspace_id: "w1", title: "Implement OAuth Flow", list: { name: "To Do" }, board: { name: "Mobile App Board" } },
        { id: "c2", board_id: "b1", workspace_id: "w1", title: "Redesign Checkout", list: { name: "In Progress" }, board: { name: "Mobile App Board" } }
    ];

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        if (!query.trim()) {
            setResults(null);
            setIsLoading(false);
            return;
        }

        setIsLoading(true);
        console.log("INTEGRATION: Service: searchService/search.service.ts -> globalSearch(query), Endpoint: GET /search?q=${query}");

        const timer = setTimeout(() => {
            const lowerQuery = query.toLowerCase();
            const filteredWorkspaces = mockWorkspaces.filter(w => w.name.toLowerCase().includes(lowerQuery) || w.description.toLowerCase().includes(lowerQuery));
            const filteredBoards = mockBoards.filter(b => b.name.toLowerCase().includes(lowerQuery) || b.description.toLowerCase().includes(lowerQuery));
            const filteredCards = mockCards.filter(c => c.title.toLowerCase().includes(lowerQuery));

            setResults({
                workspaces: filteredWorkspaces,
                boards: filteredBoards,
                cards: filteredCards
            });
            setIsLoading(false);
        }, 300);

        return () => clearTimeout(timer);
    }, [query]);

    const handleClear = () => {
        setQuery("");
        setResults(null);
        setIsOpen(false);
    };

    const hasResults = 
        (results?.workspaces && results.workspaces.length > 0) ||
        (results?.boards && results.boards.length > 0) ||
        (results?.cards && results.cards.length > 0);

    return (
        <div ref={containerRef} className="relative w-full max-w-md mx-4 z-40">
            <div className="relative flex items-center bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 hover:border-white/20 transition-all duration-200">
                <Search size={16} className="text-white/50 ml-3 flex-shrink-0" />
                <input
                    type="text"
                    placeholder="Search workspaces, boards, cards..."
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        setIsOpen(true);
                    }}
                    onFocus={() => setIsOpen(true)}
                    className="w-full bg-transparent border-none text-sm text-white px-3 py-2 focus:ring-0 focus:outline-none placeholder-white/40"
                />
                {query && (
                    <button 
                        onClick={handleClear}
                        className="text-white/50 hover:text-white mr-2.5 p-0.5 rounded-full hover:bg-white/5 transition"
                    >
                        <X size={14} />
                    </button>
                )}
            </div>

            {/* Dropdown Results */}
            {isOpen && (query.trim() || isLoading) && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-[#1C2126] border border-white/10 rounded-xl shadow-2xl overflow-hidden max-h-[350px] overflow-y-auto custom-scrollbar">
                    {isLoading ? (
                        <div className="p-4 text-center text-xs text-white/50 animate-pulse">Searching...</div>
                    ) : hasResults ? (
                        <div className="p-2 space-y-3">
                            {results?.workspaces && results.workspaces.length > 0 && (
                                <div>
                                    <div className="px-2 py-1 text-[10px] font-bold text-white/40 uppercase tracking-wider flex items-center gap-1.5">
                                        <Briefcase size={10} /> Workspaces
                                    </div>
                                    <div className="space-y-0.5 mt-1">
                                        {results.workspaces.map((w) => (
                                            <Link
                                                href={`/projects/${w.id}`}
                                                key={w.id}
                                                onClick={() => setIsOpen(false)}
                                                className="block px-2.5 py-1.5 rounded-lg text-xs text-white hover:bg-white/5 transition"
                                            >
                                                <div className="font-medium">{w.name}</div>
                                                <div className="text-[10px] text-white/40 line-clamp-1">{w.description}</div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {results?.boards && results.boards.length > 0 && (
                                <div>
                                    <div className="px-2 py-1 text-[10px] font-bold text-white/40 uppercase tracking-wider flex items-center gap-1.5">
                                        <Layout size={10} /> Boards
                                    </div>
                                    <div className="space-y-0.5 mt-1">
                                        {results.boards.map((b) => (
                                            <Link
                                                href={`/projects/${b.workspace_id}/${b.id}`}
                                                key={b.id}
                                                onClick={() => setIsOpen(false)}
                                                className="block px-2.5 py-1.5 rounded-lg text-xs text-white hover:bg-white/5 transition"
                                            >
                                                <div className="font-medium">{b.name}</div>
                                                <div className="text-[10px] text-white/40 line-clamp-1">{b.description}</div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {results?.cards && results.cards.length > 0 && (
                                <div>
                                    <div className="px-2 py-1 text-[10px] font-bold text-white/40 uppercase tracking-wider flex items-center gap-1.5">
                                        <CheckSquare size={10} /> Cards
                                    </div>
                                    <div className="space-y-0.5 mt-1">
                                        {results.cards.map((c) => (
                                            <Link
                                                href={`/projects/${c.workspace_id}/${c.board_id}`}
                                                key={c.id}
                                                onClick={() => setIsOpen(false)}
                                                className="block px-2.5 py-1.5 rounded-lg text-xs text-white hover:bg-white/5 transition"
                                            >
                                                <div className="font-medium">{c.title}</div>
                                                <div className="text-[10px] text-white/40 flex items-center gap-1.5 mt-0.5">
                                                    <span>List: {c.list?.name}</span>
                                                    <span>•</span>
                                                    <span>Board: {c.board?.name}</span>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="p-4 text-center text-xs text-white/40 italic">No matches found.</div>
                    )}
                </div>
            )}
        </div>
    );
}
