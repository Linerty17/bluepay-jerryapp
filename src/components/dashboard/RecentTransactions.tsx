
import React from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Transaction } from "../../types/transaction";

interface RecentTransactionsProps {
  transactions: Transaction[];
}

const RecentTransactions = ({ transactions }: RecentTransactionsProps) => {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium">Recent Transactions</h3>
        <Button variant="ghost" className="h-8 px-2 text-bluepay-blue">
          View All <ArrowRight size={16} />
        </Button>
      </div>
      
      <div className="space-y-3">
        {transactions.slice(0, 5).map(transaction => (
          <div key={transaction.id} className="flex justify-between py-2 border-b border-gray-100">
            <div>
              <p className="font-medium">{transaction.type}</p>
              <p className="text-xs text-gray-500">{transaction.date}</p>
              {transaction.recipient && (
                <p className="text-xs text-gray-500">{transaction.recipient}</p>
              )}
            </div>
            <div className="text-right">
              <p className="font-semibold">{transaction.amount}</p>
              <p className={`text-xs ${transaction.status === "Completed" ? "text-green-500" : "text-orange-500"}`}>
                {transaction.status}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentTransactions;
