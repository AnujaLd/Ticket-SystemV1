<?php

namespace Database\Seeders;

use App\Models\Ticket;
use Illuminate\Database\Seeder;

class TicketSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $tickets = [
            [
                'customer_name' => 'John Doe',
                'issue_description' => 'Payment not processed for order #12345',
                'priority' => 'high',
                'status' => 'open',
            ],
            [
                'customer_name' => 'Jane Smith',
                'issue_description' => 'Wrong item received in shipment',
                'priority' => 'medium',
                'status' => 'open',
            ],
            [
                'customer_name' => 'Michael Johnson',
                'issue_description' => 'Request for refund on damaged product',
                'priority' => 'low',
                'status' => 'closed',
            ],
        ];

        foreach ($tickets as $ticket) {
            Ticket::create($ticket);
        }
    }
}