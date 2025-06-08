<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Ticket;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TicketController extends Controller
{
    /**
     * Display a listing of the tickets with optional filtering.
     */
    public function index(Request $request)
    {
        $query = Ticket::query();

        // Filter by status if provided
        if ($request->has('status') && in_array($request->status, ['open', 'closed'])) {
            $query->where('status', $request->status);
        }

        // Search by customer name or issue description
        if ($request->has('search')) {
            $query->where(function ($q) use ($request) {
                $q->where('customer_name', 'like', '%' . $request->search . '%')
                  ->orWhere('issue_description', 'like', '%' . $request->search . '%');
            });
        }

        // Sort by various fields
        $sortField = $request->input('sort_by', 'created_at');
        $sortDirection = $request->input('sort_direction', 'desc');
        
        if (in_array($sortField, ['customer_name', 'priority', 'status', 'created_at', 'updated_at'])) {
            $query->orderBy($sortField, $sortDirection === 'asc' ? 'asc' : 'desc');
        }

        $tickets = $query->get();

        $stats = [
            'total' => Ticket::count(),
            'open' => Ticket::where('status', 'open')->count(),
            'closed' => Ticket::where('status', 'closed')->count(),
        ];

        return response()->json([
            'tickets' => $tickets,
            'stats' => $stats
        ]);
    }

    /**
     * Store a newly created ticket.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'customer_name' => 'required|string|max:255',
            'issue_description' => 'required|string',
            'priority' => 'required|in:low,medium,high',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $ticket = Ticket::create($validator->validated());

        return response()->json(['ticket' => $ticket, 'message' => 'Ticket created successfully'], 201);
    }

    /**
     * Display the specified ticket.
     */
    public function show(string $id)
    {
        $ticket = Ticket::findOrFail($id);
        return response()->json(['ticket' => $ticket]);
    }

    /**
     * Update the specified ticket.
     */
    public function update(Request $request, string $id)
    {
        $validator = Validator::make($request->all(), [
            'customer_name' => 'required|string|max:255',
            'issue_description' => 'required|string',
            'priority' => 'required|in:low,medium,high',
            'status' => 'required|in:open,closed',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $ticket = Ticket::findOrFail($id);
        $ticket->update($validator->validated());

        return response()->json(['ticket' => $ticket, 'message' => 'Ticket updated successfully']);
    }

    /**
     * Remove the specified ticket.
     */
    public function destroy(string $id)
    {
        $ticket = Ticket::findOrFail($id);
        $ticket->delete();

        return response()->json(['message' => 'Ticket deleted successfully']);
    }
}