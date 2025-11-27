"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Loader2 } from "lucide-react"
import { submitToNotion } from "@/actions/notion"

interface WaitlistModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function WaitlistModal({ open, onOpenChange }: WaitlistModalProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [carType, setCarType] = useState("")
  const [specialRequest, setSpecialRequest] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const result = await submitToNotion({
        name,
        email,
        phone,
        carType,
        specialRequest,
      })

      if (!result.success) {
        setError(result.error || "등록에 실패했습니다.")
        return
      }

      setIsSuccess(true)
      setName("")
      setEmail("")
      setPhone("")
      setCarType("")
      setSpecialRequest("")
    } catch (err) {
      setError("입력 정보를 확인해주세요.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleClose = () => {
    onOpenChange(false)
    setTimeout(() => {
      setIsSuccess(false)
      setError("")
      setName("")
      setEmail("")
      setPhone("")
      setCarType("")
      setSpecialRequest("")
    }, 300)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        {!isSuccess ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">웨이팅 리스트 등록</DialogTitle>
              <DialogDescription className="text-base">출시되면 가장 먼저 알려드릴게요!</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="name">이름 *</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="홍길동"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">이메일 *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="example@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">전화번호 *</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="010-1234-5678"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="carType">차량종류 *</Label>
                <Select value={carType} onValueChange={setCarType} disabled={isLoading} required>
                  <SelectTrigger id="carType" className="w-full">
                    <SelectValue placeholder="차량종류를 선택해주세요" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="소형">소형</SelectItem>
                    <SelectItem value="중형">중형</SelectItem>
                    <SelectItem value="대형">대형</SelectItem>
                    <SelectItem value="SUV">SUV</SelectItem>
                    <SelectItem value="승합차">승합차</SelectItem>
                    <SelectItem value="기타">기타</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="specialRequest">특별요청</Label>
                <Textarea
                  id="specialRequest"
                  placeholder="특별한 요청사항이 있으시면 입력해주세요 (선택사항)"
                  value={specialRequest}
                  onChange={(e) => setSpecialRequest(e.target.value)}
                  disabled={isLoading}
                  rows={3}
                />
              </div>
              {error && <p className="text-sm text-destructive">{error}</p>}
              <Button type="submit" className="w-full bg-[#36C2C9] hover:bg-[#2BADB8] text-white" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    등록 중...
                  </>
                ) : (
                  "웨이팅 리스트에 등록하기"
                )}
              </Button>
            </form>
          </>
        ) : (
          <div className="py-8 text-center space-y-4">
            <div className="text-5xl mb-4">🎉</div>
            <DialogTitle className="text-2xl font-bold">웨이팅 리스트 등록 완료!</DialogTitle>
            <DialogDescription className="text-base">출시되면 가장 먼저 알려드릴게요 🚀</DialogDescription>
            <Button onClick={handleClose} className="w-full bg-primary hover:bg-primary/90">
              닫기
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
