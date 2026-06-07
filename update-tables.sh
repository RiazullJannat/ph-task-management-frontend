#!/bin/bash

# Script to add NoDataRow import and "No data available" handling to all table components

# List of table component files to update
TABLE_FILES=(
  "components/pages/dashboard/activity/userActions/UserActionTable.tsx"
  "components/pages/dashboard/couriar/redx/assignmentTable.tsx"
  "components/pages/dashboard/couriar/redx/returnTable.tsx"
  "components/pages/dashboard/couriar/steadFast/AssignmentTable.tsx"
  "components/pages/dashboard/couriar/steadFast/ReturnTable.tsx"
  "components/pages/dashboard/couriar/pathao/assignmentTable.tsx"
  "components/pages/dashboard/couriar/pathao/returnTable.tsx"
  "components/pages/dashboard/couriar/components/ShipmentTable.tsx"
  "components/pages/dashboard/reports/agent-performance/AgentPerformanceTable.tsx"
  "components/pages/dashboard/reports/team-performance-report/team-conversion/TeamConversionTable.tsx"
  "components/pages/dashboard/reports/delivery-report/DeliveryReportTable.tsx"
  "components/pages/dashboard/products/reviews/reviewTable.tsx"
  "components/pages/dashboard/products/histroy/RequestTable.tsx"
  "components/pages/dashboard/products/addProduct/BulkProductTable.tsx"
  "components/pages/dashboard/combo/allCombo/TableView.tsx"
  "components/pages/dashboard/settings/backupAndRestore/BackupHistoryTable.tsx"
  "components/pages/dashboard/agent/all-task/allTaskTable.tsx"
  "components/pages/dashboard/agent/leaderboard/RankingsTable.tsx"
  "components/pages/dashboard/agent/attendence/attendenceTable.tsx"
  "components/pages/dashboard/agent/orders/my-orders/AgentOrderTable.tsx"
  "components/pages/dashboard/agent/call-history/callHistoryTable.tsx"
  "components/pages/dashboard/agentDashboard/leads/agentLeadsTable.tsx"
  "components/pages/dashboard/agentDashboard/leads/AgentPendingLeadsTable.tsx"
  "components/pages/dashboard/admin/teamLeader/assignleades/AssignLeadsTable.tsx"
  "components/pages/dashboard/admin/teamLeader/teamDetails/leads/LeadsTable.tsx"
  "components/pages/dashboard/admin/orders/signleOrder/cusomerSummary/TotalOrderTable.tsx"
  "components/pages/dashboard/admin/customers/bulkCustomer/BulkCustomerTable.tsx"
  "components/pages/dashboard/team-leader/myTeam/SingleGroupLeadsTable.tsx"
  "components/pages/dashboard/team-leader/dashboard/LeaderBoardTable.tsx"
  "components/pages/dashboard/team-leader/myLeads/PendingBatchesTable.tsx"
  "components/pages/dashboard/team-leader/myLeads/IndividualLeadsTable.tsx"
)

echo "🚀 Starting to update table components with NoDataRow..."

for file in "${TABLE_FILES[@]}"; do
  if [ -f "$file" ]; then
    echo "📝 Processing: $file"
    
    # Check if NoDataRow import already exists
    if ! grep -q "NoDataRow" "$file"; then
      # Add NoDataRow import after other UI imports
      sed -i '/from "@\/components\/ui\/table";/a import NoDataRow from "@/components/ui/NoDataRow";' "$file"
      echo "   ✅ Added NoDataRow import"
    else
      echo "   ⏭️  NoDataRow import already exists"
    fi
    
    # Check if safeArray import exists
    if ! grep -q "safeArray" "$file"; then
      # Add safe data utilities import
      sed -i '/import NoDataRow/a import { safeArray, safeString, safeNumber } from "@/hooks/useSafeData";' "$file"
      echo "   ✅ Added safe data utilities import"
    else
      echo "   ⏭️  Safe data utilities import already exists"
    fi
    
  else
    echo "❌ File not found: $file"
  fi
done

echo ""
echo "✨ Table component updates completed!"
echo ""
echo "📋 Manual steps required for each table:"
echo "1. Replace hardcoded data arrays with safeArray() wrapper"
echo "2. Add NoDataRow component in TableBody when data is empty"
echo "3. Add optional chaining (?.) for all data property access"
echo "4. Use safeString(), safeNumber() for safe data access"
echo ""
echo "Example pattern:"
echo "  {safeData.length === 0 ? ("
echo "    <NoDataRow"
echo "      colSpan={columnCount}"
echo "      message=\"No data available\""
echo "      description=\"Data will appear here when available\""
echo "      icon=\"📊\""
echo "    />"
echo "  ) : ("
echo "    safeData.map((item, index) => ("
echo "      // Table rows with optional chaining"
echo "    ))"
echo "  )}"