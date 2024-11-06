Attribute VB_Name = "Module1"
Sub ApplyConditionalFormatting()
    Dim targetRange As Range
    Dim calcAvg As Double
    Dim cell As Range

    On Error Resume Next
    ' store the selected range
    Set targetRange = Selection
    ' popup if user has not selected cells
    If targetRange Is Nothing Then
        MsgBox "Please select a valid range before running this macro.", vbExclamation
        Exit Sub
    End If

    ' calculate average
    calcAvg = Application.WorksheetFunction.Average(targetRange)


    ' change cells to green if they are numeric and above average and red if below average
    For Each cell In targetRange
        If IsNumeric(cell.Value) Then
            ' change to green
            If cell.Value > calcAvg Then
                cell.Interior.Color = RGB(198, 239, 206)
                cell.Font.Color = RGB(0, 97, 0)
            ' change to red
            Else
                cell.Interior.Color = RGB(255, 199, 206)
                cell.Font.Color = RGB(156, 0, 6)
            End If
        End If
    Next cell

    ' popup to confirm script execution
    MsgBox "Conditional formatting applied successfully to the selected range!", vbInformation
End Sub
