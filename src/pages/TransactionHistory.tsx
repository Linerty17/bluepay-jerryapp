
import React from "react";
import { ArrowLeft, History, Filter, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useUserStore } from "../stores/userStore";

const TransactionHistory = () => {
  const navigate = useNavigate();
  const { transactions } = useUserStore();

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-600 text-white py-4 px-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => navigate(-1)}
              className="mr-3 text-white hover:bg-blue-700"
            >
              <ArrowLeft className="h-6 w-6" />
            </Button>
            <h1 className="text-2xl font-bold">Transaction History</h1>
          </div>
          <Button variant="ghost" size="icon" className="text-white hover:bg-blue-700">
            <Filter className="h-6 w-6" />
          </Button>
        </div>
      </header>

      <div className="p-5">
        {/* Summary Card */}
        <Card className="p-5 mb-6 bg-white shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-2">All Transactions</h3>
              <p className="text-sm text-gray-600">{transactions.length} total transactions</p>
            </div>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        </Card>

        {/* Transactions List */}
        <div className="space-y-3">
          {transactions.length > 0 ? (
            transactions.map((transaction) => (
              <Card key={transaction.id} className="p-4 bg-white shadow-sm">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800">{transaction.type}</h4>
                    <p className="text-sm text-gray-600 mt-1">{transaction.date}</p>
                    {transaction.recipient && (
                      <p className="text-xs text-gray-500 mt-1">{transaction.recipient}</p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className={`font-bold ${
                      transaction.amount.startsWith('-') ? 'text-red-600' : 'text-green-600'
                    }`}>
                      {transaction.amount}
                    </p>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      transaction.status === 'Completed' 
                        ? 'bg-green-100 text-green-800'
                        : transaction.status === 'Processing'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {transaction.status}
                    </span>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <Card className="p-8 bg-white shadow-sm text-center">
              <History className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">No Transactions Yet</h3>
              <p className="text-sm text-gray-500">Your transaction history will appear here</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionHistory;
