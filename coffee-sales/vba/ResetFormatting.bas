Attribute VB_Name = "Module2"
Sub ResetFormatting()
    Dim targetRange As Range
    Dim cell As Range

    On Error Resume Next
    ' store the selected range
    Set targetRange = Selection
    ' popup if user has not selected cells
    If targetRange Is Nothing Then
        MsgBox "Please select a valid range before running this macro.", vbExclamation
        Exit Sub
    End If
    On Error GoTo 0


    ' change cells to default font and background color
    For Each cell In targetRange
        If IsNumeric(cell.Value) Then
            cell.Interior.ColorIndex = xlNone
            cell.Font.ColorIndex = xlAutomatic
        End If
    Next cell

    ' popup to confirm script execution
    MsgBox "Conditional formatting removed from the range successfully!", vbInformation
End Sub
